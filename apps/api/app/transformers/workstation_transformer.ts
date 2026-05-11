import type Workstation from '#models/workstation'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class WorkstationTransformer extends BaseTransformer<Workstation> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'code',
      'name',
      'type',
      'hourlyRate',
      'isActive',
      'createdAt',
      'updatedAt',
    ])
  }
}
