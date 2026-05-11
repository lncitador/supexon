import type WorkerRole from '#models/worker_role'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class WorkerRoleTransformer extends BaseTransformer<WorkerRole> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'name',
      'code',
      'isActive',
      'createdAt',
      'updatedAt',
    ])
  }
}
