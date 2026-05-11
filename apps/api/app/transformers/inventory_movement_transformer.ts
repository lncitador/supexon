import type InventoryMovement from '#models/inventory_movement'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class InventoryMovementTransformer extends BaseTransformer<InventoryMovement> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'itemId',
      'locationId',
      'stockLotId',
      'type',
      'quantity',
      'unitCost',
      'referenceType',
      'referenceId',
      'occurredAt',
      'createdAt',
      'updatedAt',
    ])
  }
}
