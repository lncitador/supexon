import { BomLineSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Tenant from '#models/tenant'
import Bom from '#models/bom'
import Item from '#models/item'

export default class BomLine extends BomLineSchema {
  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @belongsTo(() => Bom)
  declare bom: BelongsTo<typeof Bom>

  @belongsTo(() => Item, { foreignKey: 'componentItemId' })
  declare componentItem: BelongsTo<typeof Item>
}
