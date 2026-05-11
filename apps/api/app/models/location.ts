import { LocationSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Tenant from '#models/tenant'
import StockLot from '#models/stock_lot'
import InventoryBalance from '#models/inventory_balance'
import InventoryMovement from '#models/inventory_movement'

export default class Location extends LocationSchema {
  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @hasMany(() => StockLot)
  declare stockLots: HasMany<typeof StockLot>

  @hasMany(() => InventoryBalance)
  declare inventoryBalances: HasMany<typeof InventoryBalance>

  @hasMany(() => InventoryMovement)
  declare inventoryMovements: HasMany<typeof InventoryMovement>
}
