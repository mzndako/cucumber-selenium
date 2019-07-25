
const Page = require('../lib/PArequest')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5

describe('PA Request automatic testing', function () {
  let driver;
  let page;
  let login = {
    username: 'mzndako@gmail.com',
    password: 'Ndako1',
    options: {
      first: 2,
      second: 3
    } 
  }

  beforeEach(async () => {
    page = new Page()
    driver = page.driver
  })

  afterEach(async () => driver.quit())

  it('I can click on the PA Request link from the login page', async () => {
    await page.visit();
    const link = await page.querySelector("a[href*='pa-request']");
    await link.click();
    await page.querySelector(".login-block:nth-of-type(1) input");
  })

  it('Select Public Trade Request and fill all input', async () => {
    await page.visitPArequest()
    await page.loginToPArequest(login.username, login.password, login.options.first)
    await page.fillAndSubmitPublicTradeRequest();
  })
  
})

