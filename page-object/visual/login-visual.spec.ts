import { test } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import users from '../data/users.json'

test.describe('Login page visual tests', () => {
  let homePage: HomePage
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)

    await homePage.visit()
    await homePage.clickOnSignInButton()
  })
  //
  test('Login form', async ({}) => {
    await loginPage.snapshotLoginForm()
  })

  test('Login error message', async ({ page }) => {
    await loginPage.login(users.invalid.username, users.invalid.password)
    await loginPage.snapshotErrorMessage()
  })
})
