import type ProductionBatchOutput from '#models/production_batch_output'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ProductionBatchOutputTransformer extends BaseTransformer<ProductionBatchOutput> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'productionBatchId',
      'itemId',
      'stockLotId',
      'quantity',
      'uom',
      'type',
      'createdAt',
      'updatedAt',
    ])
  }
}
