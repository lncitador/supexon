import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

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
      table.string('name').notNullable()
      table.string('document').nullable()
      table.string('email').nullable()
      table.string('phone').nullable()
      table.string('status').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['tenant_id', 'status'])
      table.unique(['tenant_id', 'document'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
