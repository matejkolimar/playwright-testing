import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { Navbar, Tabs } from '../pages/components/Navbar'
import { TransferFundsPage, Account } from '../pages/TransferFundsPage'
import users from '../data/users.json'

test.describe('Transfer Funds and Make Payments', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  let navbar: Navbar
  let transferFundsPage: TransferFundsPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)

    await homePage.visit()
    await homePage.clickOnSignInButton()
    await loginPage.login(users.valid.username, users.valid.password)
    // This redirect fix SSL certificate error after login
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test('Transfer Funds from one account to another', async ({ page }) => {
    //? Navigate to Transfer Funds tab
    navbar = new Navbar(page)
    transferFundsPage = new TransferFundsPage(page)

    await navbar.clickOnTab(Tabs.TransferFunds)
    await page.click('#transfer_funds_tab')

    // //? Fill and submit transfer data
    await transferFundsPage.fillForm(
      Account.Brookerage,
      Account.Credit,
      '100',
      'Transfer to Credit'
    )
    await transferFundsPage.clickOnSubmitButton()

    // //? Check if transfer is correct
    transferFundsPage.asertFromAccountInput('Brokerage')
    transferFundsPage.asertToAccountInput('Credit Card')
    transferFundsPage.assertAmountInput('100')
    transferFundsPage.assertDescriptionInput('Transfer to Credit')
    await transferFundsPage.clickOnSubmitButton()
    await transferFundsPage.assertTransferSuccess()
  })
})
