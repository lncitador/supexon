import type InventoryBalance from '#models/inventory_balance'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class InventoryBalanceTransformer extends BaseTransformer<InventoryBalance> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'itemId',
      'locationId',
      'quantityOnHand',
      'quantityReserved',
      'createdAt',
      'updatedAt',
    ])
  }
}
