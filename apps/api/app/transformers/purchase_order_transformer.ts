import type PurchaseOrder from '#models/purchase_order'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class PurchaseOrderTransformer extends BaseTransformer<PurchaseOrder> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'supplierId',
      'supplierName',
      'status',
      'orderedAt',
      'expectedAt',
      'createdAt',
      'updatedAt',
    ])
  }
}
