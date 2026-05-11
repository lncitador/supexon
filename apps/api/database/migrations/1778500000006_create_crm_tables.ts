import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('customers', (table) => {
      table.increments('id')
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

    this.schema.createTable('opportunities', (table) => {
      table.increments('id')
      table
        .integer('tenant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tenants')
        .onDelete('RESTRICT')
      table
        .integer('customer_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('customers')
        .onDelete('RESTRICT')
      table.string('title').notNullable()
      table.string('stage').notNullable()
      table.decimal('expected_value', 14, 2).notNullable().defaultTo(0)
      table.date('expected_close_date').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['tenant_id', 'customer_id'])
      table.index(['tenant_id', 'stage'])
    })
  }

  async down() {
    this.schema.dropTable('opportunities')
    this.schema.dropTable('customers')
  }
}
