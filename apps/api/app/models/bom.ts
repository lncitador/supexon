import { BomSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Tenant from '#models/tenant'
import Item from '#models/item'
import BomLine from '#models/bom_line'

export default class Bom extends BomSchema {
  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @belongsTo(() => Item)
  declare item: BelongsTo<typeof Item>

  @hasMany(() => BomLine)
  declare bomLines: HasMany<typeof BomLine>
}
