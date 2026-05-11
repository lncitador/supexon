import type OperationType from '#models/operation_type'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class OperationTypeTransformer extends BaseTransformer<OperationType> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'code',
      'name',
      'category',
      'defaultUom',
      'isActive',
      'createdAt',
      'updatedAt',
    ])
  }
}
