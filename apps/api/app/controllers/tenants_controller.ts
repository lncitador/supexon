import Tenant from '#models/tenant'
import TenantUser from '#models/tenant_user'
import TenantTransformer from '#transformers/tenant_transformer'
import TenantUserTransformer from '#transformers/tenant_user_transformer'
import { activeTenantValidator, createTenantValidator } from '#validators/tenant'
import db from '@adonisjs/lucid/services/db'
import type { HttpContext } from '@adonisjs/core/http'

export default class TenantsController {
  async index({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const tenants = await Tenant.query()
      .where('isActive', true)
      .whereHas('tenantUsers', (query) => {
        query.where('userId', user.id)
      })
      .orderBy('name', 'asc')

    return serialize(TenantTransformer.transform(tenants))
  }

  async store({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createTenantValidator)

    const { tenant, membership } = await db.transaction(async (trx) => {
      const createdTenant = await Tenant.create({ ...payload, isActive: true }, { client: trx })
      const createdMembership = await TenantUser.create(
        {
          tenantId: createdTenant.id,
          userId: user.id,
          role: 'owner',
        },
        { client: trx }
      )

      return {
        tenant: createdTenant,
        membership: createdMembership,
      }
    })

    response.status(201)

    return serialize({
      tenant: TenantTransformer.transform(tenant),
      membership: TenantUserTransformer.transform(membership),
    })
  }

  async select({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { tenantId } = await activeTenantValidator.validate({ tenantId: Number(params.tenantId) })

    const membership = await TenantUser.query()
      .where('tenantId', tenantId)
      .where('userId', user.id)
      .preload('tenant')
      .first()

    if (!membership || !membership.tenant.isActive) {
      return response.forbidden({
        message: 'The selected tenant is not available for this user',
      })
    }

    return serialize({
      tenant: TenantTransformer.transform(membership.tenant),
      membership: TenantUserTransformer.transform(membership),
    })
  }
}
