import { InventoryMovementSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Tenant from '#models/tenant'
import Item from '#models/item'
import Location from '#models/location'
import StockLot from '#models/stock_lot'

export default class InventoryMovement extends InventoryMovementSchema {
  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @belongsTo(() => Item)
  declare item: BelongsTo<typeof Item>

  @belongsTo(() => Location)
  declare location: BelongsTo<typeof Location>

  @belongsTo(() => StockLot)
  declare stockLot: BelongsTo<typeof StockLot>
}
