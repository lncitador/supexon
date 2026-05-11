import type Sale from '#models/sale'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class SaleTransformer extends BaseTransformer<Sale> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'customerId',
      'locationId',
      'status',
      'subtotal',
      'discountTotal',
      'total',
      'soldAt',
      'createdAt',
      'updatedAt',
    ])
  }
}
