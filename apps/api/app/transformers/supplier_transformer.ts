import type Supplier from '#models/supplier'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class SupplierTransformer extends BaseTransformer<Supplier> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'name',
      'document',
      'email',
      'phone',
      'status',
      'createdAt',
      'updatedAt',
    ])
  }
}
