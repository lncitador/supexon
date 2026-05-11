import { ItemSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Tenant from '#models/tenant'
import StockLot from '#models/stock_lot'
import Bom from '#models/bom'

export default class Item extends ItemSchema {
  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @hasMany(() => StockLot)
  declare stockLots: HasMany<typeof StockLot>

  @hasMany(() => Bom)
  declare boms: HasMany<typeof Bom>
}
