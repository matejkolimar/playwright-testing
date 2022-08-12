const { Given, When, Then, defineStep } = require('@cucumber/cucumber')
const { HomePage } = require('../pages/home-page')

const homePage = new HomePage()

Then('I should see the home page', async function () {
  await homePage.assertUserIsLoggedIn()
})
