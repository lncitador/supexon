import { SaleSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Tenant from '#models/tenant'
import Customer from '#models/customer'
import Location from '#models/location'
import SaleItem from '#models/sale_item'
import Payment from '#models/payment'

export default class Sale extends SaleSchema {
  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => Location)
  declare location: BelongsTo<typeof Location>

  @hasMany(() => SaleItem)
  declare saleItems: HasMany<typeof SaleItem>

  @hasMany(() => Payment)
  declare payments: HasMany<typeof Payment>
}
