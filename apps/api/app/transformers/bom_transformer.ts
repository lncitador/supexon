import type Bom from '#models/bom'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class BomTransformer extends BaseTransformer<Bom> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'itemId',
      'version',
      'isActive',
      'createdAt',
      'updatedAt',
    ])
  }
}
