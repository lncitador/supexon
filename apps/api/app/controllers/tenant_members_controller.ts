import TenantUser from '#models/tenant_user'
import TenantUserTransformer from '#transformers/tenant_user_transformer'
import {
  canManageMembershipRole,
  canManageTenantMembers,
  type TenantRole,
} from '#abilities/tenant_roles'
import {
  createTenantMembershipValidator,
  updateTenantMembershipValidator,
} from '#validators/tenant'
import type { HttpContext } from '@adonisjs/core/http'

export default class TenantMembersController {
  async index({ serialize, tenantId }: HttpContext) {
    const members = await TenantUser.query()
      .where('tenantId', tenantId!)
      .preload('user')
      .orderBy('id', 'asc')

    return serialize(TenantUserTransformer.transform(members))
  }

  async store({ request, response, serialize, tenantId, tenantMembership }: HttpContext) {
    if (!canManageTenantMembers(tenantMembership!.role)) {
      return response.forbidden({ message: 'This role cannot manage tenant members' })
    }

    const payload = await request.validateUsing(createTenantMembershipValidator)

    if (!canManageMembershipRole(tenantMembership!.role, payload.role)) {
      return response.forbidden({ message: 'This role cannot manage the requested member role' })
    }

    const existing = await TenantUser.query()
      .where('tenantId', tenantId!)
      .where('userId', payload.userId)
      .first()

    if (existing) {
      return response.conflict({ message: 'User already belongs to this tenant' })
    }

    const member = await TenantUser.create({
      tenantId: tenantId!,
      userId: payload.userId,
      role: payload.role,
    })

    response.status(201)

    return serialize({
      membership: TenantUserTransformer.transform(member),
    })
  }

  async update({ params, request, response, serialize, tenantId, tenantMembership }: HttpContext) {
    if (!canManageTenantMembers(tenantMembership!.role)) {
      return response.forbidden({ message: 'This role cannot manage tenant members' })
    }

    const payload = await request.validateUsing(updateTenantMembershipValidator)
    const member = await this.findTenantMember(tenantId!, Number(params.memberId))

    if (!member) {
      return response.notFound({ message: 'Tenant member not found' })
    }

    if (!canManageMembershipRole(tenantMembership!.role, member.role)) {
      return response.forbidden({ message: 'This role cannot manage the requested member role' })
    }

    if (!canManageMembershipRole(tenantMembership!.role, payload.role)) {
      return response.forbidden({ message: 'This role cannot assign the requested member role' })
    }

    if (member.role === 'owner' && payload.role !== 'owner') {
      const canChangeOwner = await this.hasAnotherOwner(tenantId!, member.id)
      if (!canChangeOwner) {
        return response.forbidden({ message: 'A tenant must keep at least one owner' })
      }
    }

    member.role = payload.role
    await member.save()

    return serialize({
      membership: TenantUserTransformer.transform(member),
    })
  }

  async destroy({ params, response, tenantId, tenantMembership }: HttpContext) {
    if (!canManageTenantMembers(tenantMembership!.role)) {
      return response.forbidden({ message: 'This role cannot manage tenant members' })
    }

    const member = await this.findTenantMember(tenantId!, Number(params.memberId))

    if (!member) {
      return response.notFound({ message: 'Tenant member not found' })
    }

    if (!canManageMembershipRole(tenantMembership!.role, member.role)) {
      return response.forbidden({ message: 'This role cannot manage the requested member role' })
    }

    if (member.role === 'owner') {
      const canDeleteOwner = await this.hasAnotherOwner(tenantId!, member.id)
      if (!canDeleteOwner) {
        return response.forbidden({ message: 'A tenant must keep at least one owner' })
      }
    }

    await member.delete()

    return response.noContent()
  }

  private findTenantMember(tenantId: number, memberId: number) {
    return TenantUser.query().where('tenantId', tenantId).where('id', memberId).first()
  }

  private async hasAnotherOwner(tenantId: number, memberId: number) {
    const owners = await TenantUser.query()
      .where('tenantId', tenantId)
      .where('role', 'owner' satisfies TenantRole)
      .whereNot('id', memberId)
      .count('* as total')

    return Number(owners[0].$extras.total) > 0
  }
}
