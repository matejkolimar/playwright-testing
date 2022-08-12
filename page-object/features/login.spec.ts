import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import users from '../data/users.json'

test.describe.parallel('Login / Logout Flow', async () => {
  let loginPage: LoginPage
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    await homePage.visit()
  })

  test('Negative scenario for login', async ({ page }) => {
    await homePage.clickOnSignInButton()
    await loginPage.login(users.invalid.username, users.invalid.password)
    await loginPage.assertErrorMessage()
  })

  test('Positive scenario for login and logout', async ({ page }) => {
    await homePage.clickOnSignInButton()
    await loginPage.login(users.valid.username, users.valid.password)

    // This redirect fix SSL certificate error after login
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')

    const accTab = page.locator('#account_summary_tab')
    await expect(accTab).toBeVisible()
    await page.goto('http://zero.webappsecurity.com/bank/logout.html')
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
