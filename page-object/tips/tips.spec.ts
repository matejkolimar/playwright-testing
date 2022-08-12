import { test, expect } from '@playwright/test'
import { getRandomNumber, getRandomString } from '../utils/data-helpers'

test.describe.parallel('Tips & tricks section', async () => {
  test('TestInfo Object', async ({ page }, testInfo) => {
    await page.goto('https://www.example.com')
    console.log(testInfo.expectedStatus)
  })

  test('Skip browser', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium', 'Feature not ready in Chrome')
    await page.goto('https://www.example.com')
  })

  test('Fixme annotation', async ({ page, browserName }) => {
    test.fixme(browserName === 'chromium', 'Flaky test in Chrome, needs investigation')
    await page.goto('https://www.example.com')
  })

  //? Tets is executed for each user in array
  const users = ['Matej', 'Peter', 'Anicka', 'Martin']
  for (const user of users) {
    test(`Running test for ${user}`, async ({ page }) => {
      await page.goto('http://zero.webappsecurity.com/index.html')
      await page.type('#searchTerm', `${user}`)
      await page.waitForTimeout(2000)
    })
  }

  test('Mouse movementsimulation', async ({ page }) => {
    await page.goto('https://www.example.com')
    await page.mouse.move(100, 100)
    await page.mouse.down()
    await page.mouse.move(200, 200)
    await page.mouse.up()
  })

  test('Multiple browser tabs inside 1 browser', async ({ browser }) => {
    const context = await browser.newContext()
    const page1 = await context.newPage()
    const page2 = await context.newPage()
    const page3 = await context.newPage()
    await page1.goto('https://www.example.com')
    await page2.goto('https://www.example.com')
    await page3.goto('https://www.example.com')
  })

  test('Test util methods', async ({ page }) => {
    console.log(getRandomNumber(1, 10))
    console.log(getRandomString(10))
  })
})
