import { test } from '@japa/runner'

test.group('API base', () => {
  test('returns API identity from root endpoint', async ({ client }) => {
    const response = await client.get('/').accept('json')

    response.assertOk()
    response.assertBody({
      name: 'Supexon API',
      version: '1.0.0',
      status: 'ok',
    })
  })

  test('returns health status', async ({ client }) => {
    const response = await client.get('/health').accept('json')

    response.assertOk()
    response.assertBody({ status: 'ok' })
  })

  test('rejects invalid signup payloads with validation errors', async ({ client }) => {
    const response = await client.post('/api/v1/auth/signup').accept('json').unsafeJson({})

    response.assertUnprocessableEntity()
  })

  test('rejects invalid login payloads with validation errors', async ({ client }) => {
    const response = await client.post('/api/v1/auth/login').accept('json').unsafeJson({})

    response.assertUnprocessableEntity()
  })

  test('rejects anonymous profile access', async ({ client }) => {
    const response = await client.get('/api/v1/account/profile').accept('json')

    response.assertUnauthorized()
  })
})
