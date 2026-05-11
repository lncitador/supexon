import type PurchaseReceipt from '#models/purchase_receipt'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class PurchaseReceiptTransformer extends BaseTransformer<PurchaseReceipt> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'purchaseOrderId',
      'locationId',
      'receivedAt',
      'createdAt',
      'updatedAt',
    ])
  }
}
