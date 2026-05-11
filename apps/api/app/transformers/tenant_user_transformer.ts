import type TenantUser from '#models/tenant_user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class TenantUserTransformer extends BaseTransformer<TenantUser> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'userId',
      'role',
      'createdAt',
      'updatedAt',
    ])
  }
}
