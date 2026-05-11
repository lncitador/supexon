import type Routing from '#models/routing'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class RoutingTransformer extends BaseTransformer<Routing> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'itemId',
      'name',
      'isActive',
      'createdAt',
      'updatedAt',
    ])
  }
}
