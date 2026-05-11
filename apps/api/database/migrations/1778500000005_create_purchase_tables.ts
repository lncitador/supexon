import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('suppliers', (table) => {
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

    this.schema.createTable('purchase_orders', (table) => {
      table.increments('id')
      table
        .integer('tenant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tenants')
        .onDelete('RESTRICT')
      table
        .integer('supplier_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('suppliers')
        .onDelete('RESTRICT')
      table.string('supplier_name').notNullable()
      table.string('status').notNullable()
      table.timestamp('ordered_at').nullable()
      table.timestamp('expected_at').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['tenant_id', 'status'])
      table.index(['tenant_id', 'supplier_id'])
    })

    this.schema.createTable('purchase_order_lines', (table) => {
      table.increments('id')
      table
        .integer('tenant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tenants')
        .onDelete('RESTRICT')
      table
        .integer('purchase_order_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('purchase_orders')
        .onDelete('RESTRICT')
      table
        .integer('item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('items')
        .onDelete('RESTRICT')
      table.decimal('quantity', 14, 4).notNullable()
      table.decimal('unit_price', 14, 4).notNullable()
      table.date('expected_date').nullable()
      table.decimal('received_quantity', 14, 4).notNullable().defaultTo(0)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['tenant_id', 'purchase_order_id'])
      table.index(['tenant_id', 'item_id'])
    })

    this.schema.createTable('purchase_receipts', (table) => {
      table.increments('id')
      table
        .integer('tenant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tenants')
        .onDelete('RESTRICT')
      table
        .integer('purchase_order_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('purchase_orders')
        .onDelete('RESTRICT')
      table
        .integer('location_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('locations')
        .onDelete('RESTRICT')
      table.timestamp('received_at').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable('purchase_receipt_lines', (table) => {
      table.increments('id')
      table
        .integer('tenant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tenants')
        .onDelete('RESTRICT')
      table
        .integer('purchase_receipt_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('purchase_receipts')
        .onDelete('RESTRICT')
      table
        .integer('purchase_order_line_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('purchase_order_lines')
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
        .notNullable()
        .references('id')
        .inTable('stock_lots')
        .onDelete('RESTRICT')
      table.decimal('quantity', 14, 4).notNullable()
      table.decimal('unit_cost', 14, 4).notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable('purchase_receipt_lines')
    this.schema.dropTable('purchase_receipts')
    this.schema.dropTable('purchase_order_lines')
    this.schema.dropTable('purchase_orders')
    this.schema.dropTable('suppliers')
  }
}
