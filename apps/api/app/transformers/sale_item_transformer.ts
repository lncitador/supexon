import type SaleItem from '#models/sale_item'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class SaleItemTransformer extends BaseTransformer<SaleItem> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'saleId',
      'itemId',
      'stockLotId',
      'quantity',
      'unitPrice',
      'discountTotal',
      'total',
      'createdAt',
      'updatedAt',
    ])
  }
}
