
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
    page = await new Page()
    driver = page.driver
  })

  afterEach(async () => await driver.quit())

  it('I can click on the PA Request link from the login page', async () => {
    await page.visit();

    const link = await page.querySelector("a[href*='pa-request']");
    await link.click();

    await page.querySelector(".login-block:nth-of-type(1) input");
  })

  it('login to PA Request selecting \'Public Trade Request\', fill all fields and submit', async () => {
    await page.visitPArequest()
    await page.loginToPArequest(login.username, login.password, login.options.first)
    await page.fillAndSubmitPublicTradeRequest();

    const response = await page.querySelector('#pa-requests > .text-danger');
    const result = await response.getText();

    expect(result).toEqual(expect.not.stringContaining('You have not selected an account number'));
  })
  

  it('login to PA Request selecting \'Discretional Account Request\', fill all fields and submit', async () => {
    await page.visitPArequest()
    await page.loginToPArequest(login.username, login.password, login.options.second)
    await page.fillAndSubmitDAR();

    const response = await page.querySelector('.modal-body h4');
    const result = await response.getText();

    expect(result).toEqual(expect.not.stringContaining('Cannt read property \'0\' of undefined'));
  })
  
})

