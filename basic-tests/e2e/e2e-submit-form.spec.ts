import { test, expect } from '@playwright/test'

test.describe('Feedback Form', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/feedback.html')
  })

  test('Fill feedback form, reset it and check if it correctly cleaned', async ({ page }) => {
    const nameInput = page.locator('#name')
    const emailInput = page.locator('#email')
    const subjectInptu = page.locator('#subject')
    const commentInput = page.locator('#comment')

    nameInput.type('Matej Kolimar')
    emailInput.type('kolimar@inloop.eu')
    subjectInptu.type('Problme with the website')
    commentInput.type('lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.')
    await page.click('input[name="clear"]')

    await expect(nameInput).toBeEmpty()
    await expect(emailInput).toBeEmpty()
    await expect(subjectInptu).toBeEmpty()
    await expect(commentInput).toBeEmpty()
  })

  test('Fill feedback form, submit it and check if it correctly submitted', async ({ page }) => {
    await page.type('#name', 'Matej Kolimar')
    await page.type('#email', 'kolimar@inloop.eu')
    await page.type('#subject', 'Problme with the website')
    await page.type(
      '#comment',
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'
    )
    await page.click('input[name="submit"]')
    await page.waitForSelector('#feedback-title')
  })
})
