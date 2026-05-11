import type ManufacturingOrder from '#models/manufacturing_order'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ManufacturingOrderTransformer extends BaseTransformer<ManufacturingOrder> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'itemId',
      'routingId',
      'quantity',
      'status',
      'startDate',
      'dueDate',
      'createdAt',
      'updatedAt',
    ])
  }
}
