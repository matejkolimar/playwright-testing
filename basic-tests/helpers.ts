export async function loadHomepage(page) {
  await page.goto('http://example.com')
}

export async function assertTitle(page) {
  await page.waitForSelector('h1')
}

export async function login(page, credentials) {
  await page.click('#signin_button')
  await page.type('#user_login', `${credentials.name}`)
  await page.type('#user_password', `${credentials.password}`)
  await page.click('text=Sign in')
}
