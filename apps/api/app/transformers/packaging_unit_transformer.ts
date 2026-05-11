import type PackagingUnit from '#models/packaging_unit'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class PackagingUnitTransformer extends BaseTransformer<PackagingUnit> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'code',
      'name',
      'unitQuantity',
      'uom',
      'isActive',
      'createdAt',
      'updatedAt',
    ])
  }
}
