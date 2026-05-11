import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'inventory_balances'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('RESTRICT')
      table.integer('item_id').unsigned().notNullable().references('id').inTable('items').onDelete('RESTRICT')
      table.integer('location_id').unsigned().notNullable().references('id').inTable('locations').onDelete('RESTRICT')
      table.decimal('quantity_on_hand', 14, 4).notNullable().defaultTo(0)
      table.decimal('quantity_reserved', 14, 4).notNullable().defaultTo(0)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['tenant_id', 'item_id', 'location_id'])
      table.index(['tenant_id', 'location_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
