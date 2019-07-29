const Page = require('../features/supports/browser')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5

describe('Login Page automatic testing', function () {
  let driver;
  let page;
  
  beforeEach(async () => {
    page = await new Page()
    driver = page.driver
    await page.visit()
  })

  afterEach(async () => await driver.quit())

  it('I can successfully open the login page', async function () {
    const anchor = await page.findByName('email');
    expect(anchor.isDisplayed()).toBeTruthy();
  })
  
})


