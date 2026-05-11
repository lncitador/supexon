import type Worker from '#models/worker'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class WorkerTransformer extends BaseTransformer<Worker> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'name',
      'document',
      'status',
      'createdAt',
      'updatedAt',
    ])
  }
}
