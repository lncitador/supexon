import type WorkerRoleAssignment from '#models/worker_role_assignment'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class WorkerRoleAssignmentTransformer extends BaseTransformer<WorkerRoleAssignment> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'workerId',
      'workerRoleId',
      'createdAt',
      'updatedAt',
    ])
  }
}
