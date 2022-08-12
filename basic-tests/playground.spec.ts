import { test, expect } from '@playwright/test'
import { loadHomepage, assertTitle } from './helpers'

test('Simple basic test', async ({ page }) => {
  // Navigate to example.com page
  await page.goto('http://example.com')
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toHaveText('Example Domain')
})

test('Click on Elements @p1', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/')
  await page.click('#signin_button')
  await page.click('text=Sign in')
  const errorMessage = await page.locator('.alert')
  await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.describe('Grouping tests', () => {
  test('Working with Inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'somepassword')
    await page.click('text=Sign in')
    const errorMessage = await page.locator('.alert')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test('Assertions', async ({ page }) => {
    await page.goto('http://example.com')
    await expect(page).toHaveURL('http://example.com')
    await expect(page).toHaveTitle('Example Domain')

    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)

    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  })
})

test.describe.parallel.only('Hooks example', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://example.com/')
  })

  test('Screenshots', async ({ page }) => {
    await page.screenshot({
      path: './screenshots/full_page.png',
      fullPage: true,
    })
  })

  test('Single element: Screenshot', async ({ page }) => {
    const element = await page.locator('h1')
    await element.screenshot({
      path: './screenshots/single_element.png',
    })
  })
})

test('Custom helpers', async ({ page }) => {
  await loadHomepage(page)
  // await page.pause() // pause for debugging
  await assertTitle(page)
})

test.skip('Selectors', async ({ page }) => {
  // Text
  await page.click('text=some text')

  // CSS selectors
  await page.click('button') // element
  await page.click('#id') // id
  await page.click('.class') // class

  // Only visible css selectors
  await page.click('#submit-button:visible')

  // Combinations
  await page.click('#username .first')

  // XPath
  await page.click("//*[@id='usernam']/input") // all inputs with id username
})
