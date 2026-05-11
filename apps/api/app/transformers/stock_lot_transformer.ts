import type StockLot from '#models/stock_lot'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class StockLotTransformer extends BaseTransformer<StockLot> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'itemId',
      'locationId',
      'lotNumber',
      'quantityInitial',
      'quantityAvailable',
      'unitCost',
      'expiryDate',
      'status',
      'createdAt',
      'updatedAt',
    ])
  }
}
