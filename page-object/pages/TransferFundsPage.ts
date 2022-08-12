import { expect, Locator, Page } from '@playwright/test'

export enum Account {
  Savings = '1',
  Checking = '2',
  Savings2 = '3',
  Loan = '4',
  Credit = '5',
  Brookerage = '6',
}

export class TransferFundsPage {
  //? Selectors
  readonly page: Page

  //? Inputs
  readonly fromAccountInput: Locator
  readonly toAccountInput: Locator
  readonly amountInput: Locator
  readonly descriptionInput: Locator

  //? Buttons
  readonly submitButton: Locator

  //? Texts
  readonly alertMessage: Locator

  //? Constructor
  constructor(page: Page) {
    this.page = page
    this.fromAccountInput = page.locator('#tf_fromAccountId')
    this.toAccountInput = page.locator('#tf_toAccountId')
    this.amountInput = page.locator('#tf_amount')
    this.descriptionInput = page.locator('#tf_description')
    this.submitButton = page.locator('#btn_submit')
    this.alertMessage = page.locator('.alert-success')
  }

  //? Methods
  async fillForm(fromAccount: Account, toAccount: Account, amount: string, description: string) {
    await this.fromAccountInput.selectOption(fromAccount)
    await this.toAccountInput.selectOption(toAccount)
    await this.amountInput.type(amount)
    await this.descriptionInput.type(description)
  }

  async asertFromAccountInput(account) {
    await expect(this.fromAccountInput).toHaveValue(account)
  }

  async asertToAccountInput(account) {
    await expect(this.toAccountInput).toHaveValue(account)
  }

  async assertAmountInput(amount) {
    await expect(this.amountInput).toHaveValue(amount)
  }

  async assertDescriptionInput(description) {
    await expect(this.descriptionInput).toHaveValue(description)
  }

  async assertTransferSuccess() {
    await expect(this.alertMessage).toHaveText('You successfully submitted your transaction.')
  }

  async clickOnSubmitButton() {
    await this.submitButton.click()
  }
}
