import type Tenant from '#models/tenant'
import type TenantUser from '#models/tenant_user'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    tenant?: Tenant
    tenantMembership?: TenantUser
    tenantId?: number
    tenantTrx?: TransactionClientContract
  }
}
