import type ProductionBatch from '#models/production_batch'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ProductionBatchTransformer extends BaseTransformer<ProductionBatch> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'manufacturingOrderId',
      'code',
      'status',
      'startedAt',
      'finishedAt',
      'createdAt',
      'updatedAt',
    ])
  }
}
