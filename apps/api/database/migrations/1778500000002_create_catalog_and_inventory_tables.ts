import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('items', (table) => {
      table.increments('id')
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

    this.schema.createTable('locations', (table) => {
      table.increments('id')
      table
        .integer('tenant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tenants')
        .onDelete('RESTRICT')
      table.string('name').notNullable()
      table.string('code').notNullable()
      table.string('type').notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['tenant_id', 'code'])
      table.index(['tenant_id', 'type'])
    })

    this.schema.createTable('stock_lots', (table) => {
      table.increments('id')
      table
        .integer('tenant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tenants')
        .onDelete('RESTRICT')
      table
        .integer('item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('items')
        .onDelete('RESTRICT')
      table
        .integer('location_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('locations')
        .onDelete('RESTRICT')
      table.string('lot_number').notNullable()
      table.decimal('quantity_initial', 14, 4).notNullable().defaultTo(0)
      table.decimal('quantity_available', 14, 4).notNullable().defaultTo(0)
      table.decimal('unit_cost', 14, 4).notNullable().defaultTo(0)
      table.date('expiry_date').nullable()
      table.string('status').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['tenant_id', 'lot_number'])
      table.index(['tenant_id', 'item_id'])
      table.index(['tenant_id', 'location_id'])
      table.index(['tenant_id', 'status'])
    })

    this.schema.createTable('inventory_balances', (table) => {
      table.increments('id')
      table
        .integer('tenant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tenants')
        .onDelete('RESTRICT')
      table
        .integer('item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('items')
        .onDelete('RESTRICT')
      table
        .integer('location_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('locations')
        .onDelete('RESTRICT')
      table.decimal('quantity_on_hand', 14, 4).notNullable().defaultTo(0)
      table.decimal('quantity_reserved', 14, 4).notNullable().defaultTo(0)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['tenant_id', 'item_id', 'location_id'])
      table.index(['tenant_id', 'location_id'])
    })

    this.schema.createTable('inventory_movements', (table) => {
      table.increments('id')
      table
        .integer('tenant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tenants')
        .onDelete('RESTRICT')
      table
        .integer('item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('items')
        .onDelete('RESTRICT')
      table
        .integer('location_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('locations')
        .onDelete('RESTRICT')
      table
        .integer('stock_lot_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('stock_lots')
        .onDelete('RESTRICT')
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
    this.schema.dropTable('inventory_movements')
    this.schema.dropTable('inventory_balances')
    this.schema.dropTable('stock_lots')
    this.schema.dropTable('locations')
    this.schema.dropTable('items')
  }
}
