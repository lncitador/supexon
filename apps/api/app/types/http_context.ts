import type Tenant from '#models/tenant'
import type TenantUser from '#models/tenant_user'

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    tenant?: Tenant
    tenantMembership?: TenantUser
    tenantId?: number
  }
}
