import { test, expect } from '@playwright/test'

test.describe.parallel('Login / Logout Flow', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
  })

  test('Negative scenario for login', async ({ page }) => {
    await page.click('#signin_button')
    await page.type('#user_login', 'Invalid username')
    await page.type('#user_password', 'Invalid password')
    await page.click('text=Sign in')
    const errorMessage = page.locator('.alert-error')
    await expect(errorMessage).toHaveText('Login and/or password are wrong.')
  })

  test('Positive scenario for login and logout', async ({ page }) => {
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')
    // This redirect fix SSL certificate error after login
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    const accTab = page.locator('#account_summary_tab')
    await expect(accTab).toBeVisible()
    await page.goto('http://zero.webappsecurity.com/bank/logout.html')
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
