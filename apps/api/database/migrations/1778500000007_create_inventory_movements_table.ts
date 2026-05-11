import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'inventory_movements'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('RESTRICT')
      table.integer('item_id').unsigned().notNullable().references('id').inTable('items').onDelete('RESTRICT')
      table.integer('location_id').unsigned().notNullable().references('id').inTable('locations').onDelete('RESTRICT')
      table.integer('stock_lot_id').unsigned().nullable().references('id').inTable('stock_lots').onDelete('RESTRICT')
      table.string('type').notNullable()
      table.decimal('quantity', 14, 4).notNullable()
      table.decimal('unit_cost', 14, 4).nullable()
      table.string('reference_type').nullable()
      table.integer('reference_id').unsigned().nullable()
      table.timestamp('occurred_at').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['tenant_id', 'item_id'])
      table.index(['tenant_id', 'location_id'])
      table.index(['tenant_id', 'stock_lot_id'])
      table.index(['tenant_id', 'reference_type', 'reference_id'])
      table.index(['tenant_id', 'occurred_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
