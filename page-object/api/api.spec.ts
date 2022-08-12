import { test, expect } from '@playwright/test'

test.describe.parallel('API', async () => {
  const baseUrl = 'https://reqres.in/api'
  test('Simple API test - Assert response status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/1`)
    expect(response.status()).toBe(200)
  })

  test('Simple API test - Assert invalid endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2/not-existing`)
    expect(response.status()).toBe(404)
  })

  test('GET Request - Get user detail', async ({ request }) => {
    // First check response
    const response = await request.get(`${baseUrl}/users/1`)
    expect(response.status()).toBe(200)
    // Then check data
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.data.id).toBe(1)
    expect(responseBody.data.first_name).toBe('George')
    expect(responseBody.data.last_name).toBe('Bluth')
    expect(responseBody.data.email).toBeTruthy()
  })

  test('POST Request - Create New User', async ({ request }) => {
    const response = await request.post(`${baseUrl}/user`, {
      data: {
        id: 1000,
      },
    })
    expect(response.status()).toBe(201)

    const responseBody = JSON.parse(await response.text())
    expect(responseBody.id).toBe(1000)
    expect(responseBody.createdAt).toBeTruthy()
  })

  test('POST Request - Login', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    })
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
    expect(responseBody.token).toBeTruthy()
  })

  test('POST Request - Login Fail', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'peter@klaven',
      },
    })
    expect(response.status()).toBe(400)

    const responseBody = JSON.parse(await response.text())
    expect(responseBody.error).toBe('Missing password')
  })

  test('PUT Request - Update user', async ({ request }) => {
    const response = await request.put(`${baseUrl}/users/2`, {
      data: {
        name: 'Matej Kolimar',
        job: 'Test Automation Engineer in Avast',
      },
    })
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
    expect(responseBody.name).toBe('Matej Kolimar')
    expect(responseBody.job).toBe('Test Automation Engineer in Avast')
    expect(responseBody.updatedAt).toBeTruthy()
  })

  test('DELETE Request - Delete user', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/users/2`)
    expect(response.status()).toBe(204)
  })
})
