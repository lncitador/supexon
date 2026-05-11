import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'items'

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
      table.string('sku').notNullable()
      table.string('name').notNullable()
      table.text('description').nullable()
      table.string('type').notNullable()
      table.string('uom').notNullable()
      table.decimal('reorder_point', 14, 4).notNullable().defaultTo(0)
      table.decimal('standard_cost', 14, 4).notNullable().defaultTo(0)
      table.boolean('is_sellable').notNullable().defaultTo(false)
      table.boolean('is_purchasable').notNullable().defaultTo(false)
      table.boolean('is_manufacturable').notNullable().defaultTo(false)
      table.boolean('is_active').notNullable().defaultTo(true)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['tenant_id', 'sku'])
      table.index(['tenant_id', 'type'])
      table.index(['tenant_id', 'is_active'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
