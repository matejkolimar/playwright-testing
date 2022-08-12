import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'

test.describe('Search Results', () => {
  test.skip('Should find search results', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.visit()
    await homePage.search('bank')

    const numberOfLinks = await page.locator('li > a')
    expect(numberOfLinks).toHaveCount(2)
  })
})
