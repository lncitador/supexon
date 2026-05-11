import type PurchaseReceiptLine from '#models/purchase_receipt_line'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class PurchaseReceiptLineTransformer extends BaseTransformer<PurchaseReceiptLine> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'purchaseReceiptId',
      'purchaseOrderLineId',
      'itemId',
      'stockLotId',
      'quantity',
      'unitCost',
      'createdAt',
      'updatedAt',
    ])
  }
}
