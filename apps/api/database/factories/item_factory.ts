import Item from '#models/item'
import factory from '@adonisjs/lucid/factories'

export const ItemFactory = factory
  .define(Item, async ({ faker }) => {
    return {
      sku: faker.string.alphanumeric(8).toUpperCase(),
      name: faker.commerce.productName(),
      type: 'raw',
      uom: 'unit',
    }
  })
  .build()
