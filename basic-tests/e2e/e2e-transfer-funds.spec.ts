import { test, expect } from '@playwright/test'
import { login } from '../helpers'

test.describe('Transfer Funds and Make Payments', () => {
  const credentials = {
    name: 'username',
    password: 'password',
  }
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await login(page, credentials)
  })

  test('tete', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    await page.click('#transfer_funds_tab')

    //? Fill transfer data
    const fromAccount = page.locator('#tf_fromAccountId')
    const toAccount = page.locator('#tf_toAccountId')
    const amount = page.locator('#tf_amount')
    const description = page.locator('#tf_description')

    await fromAccount.selectOption('3')
    await toAccount.selectOption('2')
    await amount.type('100')
    await description.type('Transfer')
    await page.click('#btn_submit')

    //? Check if transfer is correct
    expect(fromAccount).toHaveValue('Savings')
    expect(toAccount).toHaveValue('Checking')
    expect(amount).toHaveValue('100')
    expect(description).toHaveValue('Transfer')
    await page.click('#btn_submit')

    const alertMessage = page.locator('.alert-success')
    expect(alertMessage).toHaveText('You successfully submitted your transaction.')
  })
})
