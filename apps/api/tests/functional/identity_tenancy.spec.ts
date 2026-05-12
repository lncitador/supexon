import TenantUser from '#models/tenant_user'
import { ACTIVE_TENANT_HEADER } from '#abilities/tenant_roles'
import { ItemFactory } from '#database/factories/item_factory'
import { TenantFactory } from '#database/factories/tenant_factory'
import { TenantUserFactory } from '#database/factories/tenant_user_factory'
import { UserFactory } from '#database/factories/user_factory'
import db from '@adonisjs/lucid/services/db'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import type User from '#models/user'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'

async function createUser(email: string) {
  return UserFactory.merge({
    name: email.split('@')[0],
    email,
    password: 'password123',
  }).create()
}

async function createTenantWithMember(user: User, role = 'owner', slug = `tenant-${Date.now()}`) {
  const tenant = await TenantFactory.merge({
    name: slug,
    slug,
    isActive: true,
  }).create()

  const membership = await TenantUserFactory.merge({
    tenantId: tenant.id,
    userId: user.id,
    role,
  }).create()

  return { tenant, membership }
}

async function withTenantContext<T>(
  tenantId: number,
  callback: (trx: TransactionClientContract) => Promise<T>
) {
  return await db.transaction(async (trx) => {
    await trx.rawQuery("select set_config('app.tenant_id', ?, true)", [String(tenantId)])

    return await callback(trx)
  })
}

test.group('Identity tenancy', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('creates tenant and owner membership for authenticated user', async ({ client, assert }) => {
    const user = await createUser('owner-create@example.com')

    const response = await client.post('/api/v1/tenants').loginAs(user).accept('json').unsafeJson({
      name: 'Tenant One',
      slug: 'tenant-one',
    })

    response.assertCreated()
    response.assertBodyContains({
      data: {
        tenant: {
          name: 'Tenant One',
          slug: 'tenant-one',
          isActive: true,
        },
        membership: {
          userId: user.id,
          role: 'owner',
        },
      },
    })

    const membership = await TenantUser.query()
      .where('tenantId', response.body().data.tenant.id)
      .where('userId', user.id)
      .first()

    assert.equal(membership?.role, 'owner')
  })

  test('rejects invalid tenant payloads', async ({ client }) => {
    const user = await createUser('invalid-tenant@example.com')

    const response = await client
      .post('/api/v1/tenants')
      .loginAs(user)
      .accept('json')
      .unsafeJson({})

    response.assertUnprocessableEntity()
  })

  test('lists only accessible active tenants', async ({ client }) => {
    const user = await createUser('tenant-list@example.com')
    const otherUser = await createUser('tenant-list-other@example.com')
    const accessible = await createTenantWithMember(user, 'owner', 'tenant-list-accessible')
    await TenantFactory.merge({
      name: 'tenant-list-inaccessible',
      slug: 'tenant-list-inaccessible',
      isActive: false,
    }).create()
    await createTenantWithMember(otherUser, 'owner', 'tenant-list-other-accessible')

    const response = await client.get('/api/v1/tenants').loginAs(user).accept('json')

    response.assertOk()
    response.assertBodyContains({
      data: [
        {
          id: accessible.tenant.id,
          slug: 'tenant-list-accessible',
        },
      ],
    })
  })

  test('rejects inaccessible and inactive tenant selection', async ({ client }) => {
    const user = await createUser('select-user@example.com')
    const otherUser = await createUser('select-other@example.com')
    const { tenant } = await createTenantWithMember(otherUser, 'owner', 'select-other-tenant')

    const inaccessibleResponse = await client
      .put(`/api/v1/account/active-tenant/${tenant.id}`)
      .loginAs(user)
      .accept('json')

    inaccessibleResponse.assertForbidden()

    const inactiveTenant = await TenantFactory.merge({
      name: 'select-inactive-tenant',
      slug: 'select-inactive-tenant',
      isActive: false,
    }).create()
    await TenantUserFactory.merge({
      tenantId: inactiveTenant.id,
      userId: user.id,
      role: 'owner',
    }).create()

    const inactiveResponse = await client
      .put(`/api/v1/account/active-tenant/${inactiveTenant.id}`)
      .loginAs(user)
      .accept('json')

    inactiveResponse.assertForbidden()
  })

  test('returns selected active tenant context', async ({ client }) => {
    const user = await createUser('select-valid@example.com')
    const { tenant } = await createTenantWithMember(user, 'admin', 'select-valid-tenant')

    const response = await client
      .put(`/api/v1/account/active-tenant/${tenant.id}`)
      .loginAs(user)
      .accept('json')

    response.assertOk()
    response.assertBodyContains({
      data: {
        tenant: {
          id: tenant.id,
        },
        membership: {
          role: 'admin',
        },
      },
    })
  })

  test('requires valid active tenant header on tenant-scoped routes', async ({ client }) => {
    const user = await createUser('tenant-context@example.com')
    const otherUser = await createUser('tenant-context-other@example.com')
    const { tenant } = await createTenantWithMember(user, 'owner', 'tenant-context-owned')
    const other = await createTenantWithMember(otherUser, 'owner', 'tenant-context-other')

    const missingResponse = await client.get('/api/v1/tenants/members').loginAs(user).accept('json')
    missingResponse.assertBadRequest()

    const forbiddenResponse = await client
      .get('/api/v1/tenants/members')
      .loginAs(user)
      .header(ACTIVE_TENANT_HEADER, String(other.tenant.id))
      .accept('json')
    forbiddenResponse.assertForbidden()

    const validResponse = await client
      .get('/api/v1/tenants/members')
      .loginAs(user)
      .header(ACTIVE_TENANT_HEADER, String(tenant.id))
      .accept('json')
    validResponse.assertOk()
  })

  test('enforces owner admin and non-admin membership management rules', async ({ client }) => {
    const owner = await createUser('member-owner@example.com')
    const admin = await createUser('member-admin@example.com')
    const operator = await createUser('member-operator@example.com')
    const newMember = await createUser('member-new@example.com')
    const { tenant } = await createTenantWithMember(owner, 'owner', 'member-rules-tenant')
    const adminMembership = await TenantUserFactory.merge({
      tenantId: tenant.id,
      userId: admin.id,
      role: 'admin',
    }).create()
    await TenantUserFactory.merge({
      tenantId: tenant.id,
      userId: operator.id,
      role: 'operator',
    }).create()

    const ownerResponse = await client
      .post('/api/v1/tenants/members')
      .loginAs(owner)
      .header(ACTIVE_TENANT_HEADER, String(tenant.id))
      .accept('json')
      .unsafeJson({ userId: newMember.id, role: 'viewer' })
    ownerResponse.assertCreated()

    const adminCannotCreateOwner = await client
      .post('/api/v1/tenants/members')
      .loginAs(admin)
      .header(ACTIVE_TENANT_HEADER, String(tenant.id))
      .accept('json')
      .unsafeJson({ userId: owner.id, role: 'owner' })
    adminCannotCreateOwner.assertForbidden()

    const operatorCannotManage = await client
      .put(`/api/v1/tenants/members/${adminMembership.id}`)
      .loginAs(operator)
      .header(ACTIVE_TENANT_HEADER, String(tenant.id))
      .accept('json')
      .unsafeJson({ role: 'viewer' })
    operatorCannotManage.assertForbidden()
  })

  test('rejects unsupported membership roles', async ({ client }) => {
    const owner = await createUser('role-owner@example.com')
    const user = await createUser('role-new@example.com')
    const { tenant } = await createTenantWithMember(owner, 'owner', 'role-tenant')

    const response = await client
      .post('/api/v1/tenants/members')
      .loginAs(owner)
      .header(ACTIVE_TENANT_HEADER, String(tenant.id))
      .accept('json')
      .unsafeJson({ userId: user.id, role: 'super-admin' })

    response.assertUnprocessableEntity()
  })

  test('blocks deleting the last tenant owner', async ({ client }) => {
    const owner = await createUser('last-owner@example.com')
    const { tenant, membership } = await createTenantWithMember(owner, 'owner', 'last-owner-tenant')

    const response = await client
      .delete(`/api/v1/tenants/members/${membership.id}`)
      .loginAs(owner)
      .header(ACTIVE_TENANT_HEADER, String(tenant.id))
      .accept('json')

    response.assertForbidden()
  })

  test('isolates tenant-owned rows with PostgreSQL RLS', async ({ assert }) => {
    const user = await createUser('rls-user@example.com')
    const otherUser = await createUser('rls-other@example.com')
    const first = await createTenantWithMember(user, 'owner', 'rls-first')
    const second = await createTenantWithMember(otherUser, 'owner', 'rls-second')

    await withTenantContext(first.tenant.id, async (trx) => {
      await ItemFactory.merge({
        tenantId: first.tenant.id,
        sku: 'FIRST',
        name: 'First item',
        type: 'raw',
        uom: 'unit',
      })
        .client(trx)
        .create()
    })

    await withTenantContext(second.tenant.id, async (trx) => {
      await ItemFactory.merge({
        tenantId: second.tenant.id,
        sku: 'SECOND',
        name: 'Second item',
        type: 'raw',
        uom: 'unit',
      })
        .client(trx)
        .create()
    })

    const firstTenantItems = await withTenantContext(first.tenant.id, (trx) =>
      ItemFactory.factory.model.query().useTransaction(trx).orderBy('sku')
    )
    assert.deepEqual(
      firstTenantItems.map((item) => item.sku),
      ['FIRST']
    )

    const noTenantItems = await ItemFactory.factory.model.query()
    assert.lengthOf(noTenantItems, 0)
  })
})
