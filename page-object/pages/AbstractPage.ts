import { Page } from '@playwright/test'

//? Functionality that should be used on multiple pages is extracted into AbstractPage
//? Other pages can extend AbstractPage and use the functionality
export class AbstractPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async wait(time) {
    await this.page.waitForTimeout(time)
  }
}
