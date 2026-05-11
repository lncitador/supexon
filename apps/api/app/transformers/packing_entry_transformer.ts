import type PackingEntry from '#models/packing_entry'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class PackingEntryTransformer extends BaseTransformer<PackingEntry> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'productionBatchId',
      'itemId',
      'stockLotId',
      'packagingUnitId',
      'locationId',
      'quantity',
      'packageCount',
      'status',
      'packedAt',
      'createdAt',
      'updatedAt',
    ])
  }
}
