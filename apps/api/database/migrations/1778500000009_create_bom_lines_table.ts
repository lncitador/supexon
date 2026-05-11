import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bom_lines'

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
        .integer('bom_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('boms')
        .onDelete('RESTRICT')
      table
        .integer('component_item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('items')
        .onDelete('RESTRICT')
      table.decimal('quantity', 14, 4).notNullable()
      table.string('uom').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['tenant_id', 'bom_id'])
      table.index(['tenant_id', 'component_item_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
