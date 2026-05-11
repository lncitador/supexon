import type PurchaseOrderLine from '#models/purchase_order_line'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class PurchaseOrderLineTransformer extends BaseTransformer<PurchaseOrderLine> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'purchaseOrderId',
      'itemId',
      'quantity',
      'unitPrice',
      'expectedDate',
      'receivedQuantity',
      'createdAt',
      'updatedAt',
    ])
  }
}
