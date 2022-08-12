class LoginPage {
  async navigateToLoginScreen() {
    await page.goto('http://www.saucedemo.com/')
  }

  async submitLoginForm() {
    await page.type('#user-name', 'standard_user')
    await page.type('#password', 'secret_sauce')
    await page.click('#login-button')
  }

  async submitLoginWithParameters(username, password) {
    await page.type('#user-name', username)
    await page.type('#password', password)
    await page.click('#login-button')
  }

  async pause() {
    await page.waitForTimeout(3000)
  }
}

module.exports = { LoginPage }
