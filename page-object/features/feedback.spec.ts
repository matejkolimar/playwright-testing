import { test } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { FeedbackPage } from '../pages/FeedbackPage'

test.describe('Feedback Form', async () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)

    //! For some reason this import is not visible inside tests
    //! so i must include feedbackPage into every test
    // const feedbackPage = new FeedbackPage(page)
    await homePage.visit()
    await homePage.clickOnFeedbackTab()
  })

  test('Fill feedback form, reset it and check if it correctly cleaned', async ({ page }) => {
    const feedbackPage = new FeedbackPage(page)
    await feedbackPage.fillForm(
      'Matej Kolimar',
      'kolimar@inloop.eu',
      'Problmem with the website',
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'
    )
    await feedbackPage.clearForm()
    await feedbackPage.assertResetForm()
  })

  test('Fill feedback form, submit it and check if it correctly submitted', async ({ page }) => {
    const feedbackPage = new FeedbackPage(page)
    await feedbackPage.fillForm(
      'Matej Kolimar',
      'kolimar@inloop.eu',
      'Problmem with the website',
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'
    )
    await feedbackPage.submitForm()
    await feedbackPage.assertFormSubmitted()
  })
})
