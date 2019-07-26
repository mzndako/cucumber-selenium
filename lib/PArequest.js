const Page = require('./Page');
const Faker = require('faker');
const { DAR } = require('../locators/PArequest')

Page.prototype.visitPArequest = async function () {
  await this.visit();
  const link = await this.querySelector("a[href*='pa-request']");
  await link.click();
  await this.querySelector(".login-block:nth-of-type(1) input");
}

Page.prototype.loginToPArequest = async function (user, pass, optionType) {
  const username = await this.querySelector('.login-block:nth-of-type(1) input')
  const password = await this.querySelector('.login-block:nth-of-type(2) input')

  await this.fill(username, user)
  await this.fill(password, pass)
  await this.selectButtonDropDown('.select-button', optionType)

  const login = await this.findById('login-btn');
  await login.click()
}

Page.prototype.fillAndSubmitPublicTradeRequest = async function () {
  await this.selectButtonDropDown('.trade-details.select-button', 1);
  await this.selectButtonDropDown('.full-width .select-button', 2);

  const all = await this.driver.findElements(this.By.css("input.user-info-fields:not([disabled])"));
  
  all.forEach(async input => {
    await input.sendKeys(Faker.name.findName())
  })

  const sendRequest = await this.querySelector(".tr-send-request")
  await sendRequest.click();
 }

Page.prototype.fillAndSubmitDAR = async function () {
  await this.queryAndFill(DAR.nameOfBroker, Faker.name.findName());
  await this.queryAndFill(DAR.emailOfBroker, Faker.internet.email());
  await this.queryAndFill(DAR.address, Faker.address.streetAddress());
  await this.queryAndFill(DAR.description, Faker.name.jobDescriptor());
  await this.queryAndFill(DAR.type, Faker.name.jobType());
  
  const sendRequest = await this.querySelector(".tr-send-request")
  sendRequest.click();
 }

module.exports = Page