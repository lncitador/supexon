import type Location from '#models/location'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class LocationTransformer extends BaseTransformer<Location> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'name',
      'code',
      'type',
      'isActive',
      'createdAt',
      'updatedAt',
    ])
  }
}
