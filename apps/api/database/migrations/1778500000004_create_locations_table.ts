import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('tenant_id').unsigned().notNullable().references('id').inTable('tenants').onDelete('RESTRICT')
      table.string('name').notNullable()
      table.string('code').notNullable()
      table.string('type').notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['tenant_id', 'code'])
      table.index(['tenant_id', 'type'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
