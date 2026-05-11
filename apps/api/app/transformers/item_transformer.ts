import type Item from '#models/item'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ItemTransformer extends BaseTransformer<Item> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'sku',
      'name',
      'description',
      'type',
      'uom',
      'reorderPoint',
      'standardCost',
      'isSellable',
      'isPurchasable',
      'isManufacturable',
      'isActive',
      'createdAt',
      'updatedAt',
    ])
  }
}
