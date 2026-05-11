import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('users', (table) => {
      table.increments('id')
      table.string('name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable('tenants', (table) => {
      table.increments('id')
      table
        .integer('parent_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('tenants')
        .onDelete('RESTRICT')
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['slug'])
      table.index(['parent_id'])
    })

    this.schema.createTable('tenant_users', (table) => {
      table.increments('id')
      table
        .integer('tenant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tenants')
        .onDelete('RESTRICT')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
      table.string('role').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['tenant_id', 'user_id'])
      table.index(['user_id'])
    })

    this.schema.createTable('auth_access_tokens', (table) => {
      table.increments('id')
      table
        .integer('tokenable_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('type').notNullable()
      table.string('name').nullable()
      table.string('hash').notNullable()
      table.text('abilities').notNullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('last_used_at').nullable()
      table.timestamp('expires_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable('auth_access_tokens')
    this.schema.dropTable('tenant_users')
    this.schema.dropTable('tenants')
    this.schema.dropTable('users')
  }
}
