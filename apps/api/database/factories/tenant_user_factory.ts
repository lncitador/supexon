import TenantUser from '#models/tenant_user'
import { type TenantRole } from '#abilities/tenant_roles'
import factory from '@adonisjs/lucid/factories'

export const TenantUserFactory = factory
  .define(TenantUser, () => {
    return {
      role: 'owner' satisfies TenantRole,
    }
  })
  .build()
