import type OperationEntry from '#models/operation_entry'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class OperationEntryTransformer extends BaseTransformer<OperationEntry> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'productionBatchId',
      'manufacturingOrderId',
      'operationTypeId',
      'workstationId',
      'workerId',
      'itemId',
      'inputQuantity',
      'outputQuantity',
      'uom',
      'startedAt',
      'finishedAt',
      'durationMinutes',
      'status',
      'notes',
      'createdAt',
      'updatedAt',
    ])
  }
}
