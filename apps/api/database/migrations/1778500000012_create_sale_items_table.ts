import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sale_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('tenant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tenants')
        .onDelete('RESTRICT')
      table
        .integer('sale_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('sales')
        .onDelete('RESTRICT')
      table
        .integer('item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('items')
        .onDelete('RESTRICT')
      table
        .integer('stock_lot_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('stock_lots')
        .onDelete('RESTRICT')
      table.decimal('quantity', 14, 4).notNullable()
      table.decimal('unit_price', 14, 4).notNullable()
      table.decimal('discount_total', 14, 2).notNullable().defaultTo(0)
      table.decimal('total', 14, 2).notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['tenant_id', 'sale_id'])
      table.index(['tenant_id', 'item_id'])
      table.index(['tenant_id', 'stock_lot_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
