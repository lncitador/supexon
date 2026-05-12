import TenantUser from '#models/tenant_user'
import { ACTIVE_TENANT_HEADER } from '#abilities/tenant_roles'
import db from '@adonisjs/lucid/services/db'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class TenantContextMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.getUserOrFail()
    const tenantId = Number(ctx.request.header(ACTIVE_TENANT_HEADER))

    if (!Number.isInteger(tenantId) || tenantId <= 0) {
      return ctx.response.badRequest({
        message: `Missing or invalid ${ACTIVE_TENANT_HEADER} header`,
      })
    }

    const membership = await TenantUser.query()
      .where('tenantId', tenantId)
      .where('userId', user.id)
      .preload('tenant')
      .first()

    if (!membership || !membership.tenant.isActive) {
      return ctx.response.forbidden({
        message: 'The selected tenant is not available for this user',
      })
    }

    ctx.tenantId = tenantId
    ctx.tenant = membership.tenant
    ctx.tenantMembership = membership

    await db.rawQuery("select set_config('app.tenant_id', ?, false)", [String(tenantId)])

    try {
      return await next()
    } finally {
      await db.rawQuery("select set_config('app.tenant_id', '', false)")
    }
  }
}
