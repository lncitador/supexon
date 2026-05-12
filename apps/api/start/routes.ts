import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

const TenantsController = () => import('#controllers/tenants_controller')
const TenantMembersController = () => import('#controllers/tenant_members_controller')

router.get('/', () => {
  return { name: 'Supexon API', version: '1.0.0', status: 'ok' }
})

router.get('/health', () => {
  return { status: 'ok' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.put('active-tenant/:tenantId', [TenantsController, 'select'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('/', [TenantsController, 'index'])
        router.post('/', [TenantsController, 'store'])

        router
          .group(() => {
            router.get('/', [TenantMembersController, 'index'])
            router.post('/', [TenantMembersController, 'store'])
            router.put('/:memberId', [TenantMembersController, 'update'])
            router.delete('/:memberId', [TenantMembersController, 'destroy'])
          })
          .prefix('members')
          .as('members')
          .use(middleware.tenant())
      })
      .prefix('tenants')
      .as('tenants')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
