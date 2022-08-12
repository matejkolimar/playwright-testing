import { Locator, Page } from '@playwright/test'

export enum Tabs {
  AccountSummary = 'account_summary',
  AccountActivity = 'account_activity',
  TransferFunds = 'transfer_funds',
  PayBills = 'pay_bills',
  MoneyMap = 'money_map',
  OnlineStatements = 'online_statements',
}

export class Navbar {
  readonly page: Page

  readonly accountSummary: Locator
  readonly accountActivity: Locator
  readonly transferFunds: Locator
  readonly payBills: Locator
  readonly myMoneyApp: Locator
  readonly onlineStatement: Locator

  //? Constructor
  constructor(page: Page) {
    this.page = page
    this.accountSummary = page.locator(`#${Tabs.AccountSummary}_tab`)
    this.accountActivity = page.locator(`#${Tabs.AccountActivity}_tab`)
    this.transferFunds = page.locator(`#${Tabs.TransferFunds}_tab`)
    this.payBills = page.locator(`#${Tabs.PayBills}_tab`)
    this.myMoneyApp = page.locator(`#${Tabs.MoneyMap}_tab`)
    this.onlineStatement = page.locator(`#${Tabs.OnlineStatements}_tab`)
  }

  //? Methods
  async clickOnTab(tab: Tabs) {
    await this.page.locator(`#${tab}_tab`).click()
  }
}
