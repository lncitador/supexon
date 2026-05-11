import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'boms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('RESTRICT')
      table.integer('item_id').unsigned().notNullable().references('id').inTable('items').onDelete('RESTRICT')
      table.string('version').notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['tenant_id', 'item_id', 'version'])
      table.index(['tenant_id', 'is_active'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
