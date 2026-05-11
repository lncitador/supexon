import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('sales', (table) => {
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
        .nullable()
        .references('id')
        .inTable('customers')
        .onDelete('RESTRICT')
      table
        .integer('location_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('locations')
        .onDelete('RESTRICT')
      table.string('status').notNullable()
      table.decimal('subtotal', 14, 2).notNullable().defaultTo(0)
      table.decimal('discount_total', 14, 2).notNullable().defaultTo(0)
      table.decimal('total', 14, 2).notNullable().defaultTo(0)
      table.timestamp('sold_at').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['tenant_id', 'status'])
      table.index(['tenant_id', 'customer_id'])
      table.index(['tenant_id', 'location_id'])
      table.index(['tenant_id', 'sold_at'])
    })

    this.schema.createTable('sale_items', (table) => {
      table.increments('id')
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

    this.schema.createTable('payments', (table) => {
      table.increments('id')
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
      table.string('method').notNullable()
      table.decimal('amount', 14, 2).notNullable()
      table.string('status').notNullable()
      table.timestamp('paid_at').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['tenant_id', 'sale_id'])
      table.index(['tenant_id', 'status'])
    })
  }

  async down() {
    this.schema.dropTable('payments')
    this.schema.dropTable('sale_items')
    this.schema.dropTable('sales')
  }
}
