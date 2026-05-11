import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stock_lots'

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
        .integer('item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('items')
        .onDelete('RESTRICT')
      table
        .integer('location_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('locations')
        .onDelete('RESTRICT')
      table.string('lot_number').notNullable()
      table.decimal('quantity_initial', 14, 4).notNullable().defaultTo(0)
      table.decimal('quantity_available', 14, 4).notNullable().defaultTo(0)
      table.decimal('unit_cost', 14, 4).notNullable().defaultTo(0)
      table.date('expiry_date').nullable()
      table.string('status').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['tenant_id', 'lot_number'])
      table.index(['tenant_id', 'item_id'])
      table.index(['tenant_id', 'location_id'])
      table.index(['tenant_id', 'status'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
