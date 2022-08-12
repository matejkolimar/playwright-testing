import { expect, Locator, Page } from '@playwright/test'

export class FeedbackPage {
  readonly page: Page
  //? Inputs
  readonly commentInput: Locator
  readonly emailInput: Locator
  readonly nameInput: Locator
  readonly subjectInput: Locator

  //? Buttons
  readonly clearButton: Locator
  readonly feedbackTitle: Locator
  readonly submitButton: Locator

  //? Constructor
  constructor(page: Page) {
    this.page = page
    this.commentInput = page.locator('#comment')
    this.emailInput = page.locator('#email')
    this.nameInput = page.locator('#name')
    this.subjectInput = page.locator('#subject')
    this.clearButton = page.locator('input[name="clear"]')
    this.feedbackTitle = page.locator('#feedback-title')
    this.submitButton = page.locator('input[name="submit"]')
  }

  //? Methods
  async fillForm(name: string, email: string, subject: string, comment: string) {
    await this.nameInput.type(name)
    await this.emailInput.type(email)
    await this.subjectInput.type(subject)
    await this.commentInput.type(comment)
  }

  async clearForm() {
    await this.clearButton.click()
  }

  async submitForm() {
    await this.submitButton.click()
  }

  async assertResetForm() {
    await expect(this.nameInput).toBeEmpty()
    await expect(this.emailInput).toBeEmpty()
    await expect(this.subjectInput).toBeEmpty()
    await expect(this.commentInput).toBeEmpty()
  }

  async assertFormSubmitted() {
    await expect(this.feedbackTitle).toBeVisible()
  }
}
