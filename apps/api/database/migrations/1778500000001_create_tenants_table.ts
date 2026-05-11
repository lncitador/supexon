import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tenants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('parent_id').unsigned().nullable().references('id').inTable('tenants').onDelete('RESTRICT')
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['slug'])
      table.index(['parent_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
