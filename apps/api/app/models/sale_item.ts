import { SaleItemSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Tenant from '#models/tenant'
import Sale from '#models/sale'
import Item from '#models/item'
import StockLot from '#models/stock_lot'

export default class SaleItem extends SaleItemSchema {
  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @belongsTo(() => Sale)
  declare sale: BelongsTo<typeof Sale>

  @belongsTo(() => Item)
  declare item: BelongsTo<typeof Item>

  @belongsTo(() => StockLot)
  declare stockLot: BelongsTo<typeof StockLot>
}
