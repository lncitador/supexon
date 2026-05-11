import type Tenant from '#models/tenant'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class TenantTransformer extends BaseTransformer<Tenant> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'parentId',
      'name',
      'slug',
      'isActive',
      'createdAt',
      'updatedAt',
    ])
  }
}
