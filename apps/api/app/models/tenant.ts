import { TenantSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import TenantUser from '#models/tenant_user'

export default class Tenant extends TenantSchema {
  @hasMany(() => TenantUser)
  declare tenantUsers: HasMany<typeof TenantUser>
}
