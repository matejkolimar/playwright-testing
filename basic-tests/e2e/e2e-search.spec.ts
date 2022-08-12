import { test, expect } from '@playwright/test'

test.describe('Search Results', () => {
  test('Should find search results', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#searchTerm')
    await page.type('#searchTerm', 'bank')
    await page.keyboard.press('Enter')

    const numberOfLinks = await page.locator('li > a')
    expect(numberOfLinks).toHaveCount(2)
  })
})
