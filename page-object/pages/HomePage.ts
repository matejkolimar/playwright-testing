import { Locator, Page } from '@playwright/test'

export class HomePage {
  //? Selectors
  readonly page: Page
  readonly signInButton: Locator
  readonly searchBox: Locator
  readonly feedbackTab: Locator

  //? Constructor
  constructor(page: Page) {
    this.page = page
    this.signInButton = page.locator('#signin_button')
    this.searchBox = page.locator('#searchTerm')
    this.feedbackTab = page.locator('#feedback')
  }

  //? Methods
  async visit() {
    await this.page.goto('http://zero.webappsecurity.com/')
  }

  async clickOnSignInButton() {
    await this.signInButton.click()
  }

  async clickOnFeedbackTab() {
    await this.feedbackTab.click()
  }

  async search(searchTerm: string) {
    await this.searchBox.type(searchTerm)
    await this.searchBox.press('Enter')
  }
}
