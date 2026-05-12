export const TENANT_ROLES = ['owner', 'admin', 'operator', 'seller', 'viewer'] as const

export type TenantRole = (typeof TENANT_ROLES)[number]

export const ACTIVE_TENANT_HEADER = 'X-Supexon-Tenant-Id'

export function isTenantRole(value: string): value is TenantRole {
  return TENANT_ROLES.includes(value as TenantRole)
}

export function canManageTenantMembers(role: string) {
  return role === 'owner' || role === 'admin'
}

export function canManageMembershipRole(actorRole: string, targetRole: string) {
  if (actorRole === 'owner') {
    return true
  }

  return actorRole === 'admin' && targetRole !== 'owner'
}
