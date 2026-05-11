import type WorkerProductionEntry from '#models/worker_production_entry'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class WorkerProductionEntryTransformer extends BaseTransformer<WorkerProductionEntry> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'workerId',
      'workerRoleId',
      'operationEntryId',
      'operationTypeId',
      'itemId',
      'workstationId',
      'quantity',
      'uom',
      'rate',
      'amount',
      'status',
      'occurredAt',
      'createdAt',
      'updatedAt',
    ])
  }
}
