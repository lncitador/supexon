import Tenant from '#models/tenant'
import factory from '@adonisjs/lucid/factories'

export const TenantFactory = factory
  .define(Tenant, async ({ faker }) => {
    const name = faker.company.name()

    return {
      name,
      slug: faker.helpers.slugify(`${name}-${faker.string.alphanumeric(6)}`).toLowerCase(),
      isActive: true,
    }
  })
  .build()
