import vine from '@vinejs/vine'
import { TENANT_ROLES } from '#abilities/tenant_roles'

export const createTenantValidator = vine.create({
  name: vine.string().trim().minLength(2).maxLength(255),
  slug: vine
    .string()
    .trim()
    .minLength(2)
    .maxLength(255)
    .unique({ table: 'tenants', column: 'slug' }),
  parentId: vine.number().positive().nullable().optional(),
})

export const activeTenantValidator = vine.create({
  tenantId: vine.number().positive(),
})

export const createTenantMembershipValidator = vine.create({
  userId: vine.number().positive(),
  role: vine.enum(TENANT_ROLES),
})

export const updateTenantMembershipValidator = vine.create({
  role: vine.enum(TENANT_ROLES),
})
