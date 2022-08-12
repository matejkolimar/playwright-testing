class HomePage {
  async assertUserIsLoggedIn() {
    await page.waitForSelector('.inventory_list')
  }
}

module.exports = { HomePage }
