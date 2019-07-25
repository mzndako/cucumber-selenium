const Page = require('../lib/Page')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5

describe('Login Page automatic testing', function () {
  let driver;
  let page;
  
  beforeEach(async () => {
    page = new Page()
    driver = page.driver
    await page.visit()
  })

  afterEach(async () => driver.quit())

  it('I can successfully open the login page', async function () {
    const anchor = await page.findByName('email');
    expect(anchor.isDisplayed()).toBeTruthy();
  })
  
})


