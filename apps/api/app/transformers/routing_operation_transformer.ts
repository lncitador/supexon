import type RoutingOperation from '#models/routing_operation'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class RoutingOperationTransformer extends BaseTransformer<RoutingOperation> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'routingId',
      'operationTypeId',
      'workstationId',
      'sequence',
      'setupTime',
      'cycleTime',
      'inputUom',
      'outputUom',
      'createdAt',
      'updatedAt',
    ])
  }
}
