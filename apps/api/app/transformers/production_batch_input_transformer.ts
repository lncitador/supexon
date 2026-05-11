import type ProductionBatchInput from '#models/production_batch_input'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ProductionBatchInputTransformer extends BaseTransformer<ProductionBatchInput> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'productionBatchId',
      'itemId',
      'stockLotId',
      'plannedQuantity',
      'consumedQuantity',
      'uom',
      'createdAt',
      'updatedAt',
    ])
  }
}
