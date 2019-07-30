require('chromedriver')
require('geckodriver')
require('selenium-webdriver/chrome')
require('selenium-webdriver/firefox')

const { Builder, By, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')


// option.addArguments("test-type");
// option.addArguments("start-maximized");
// option.addArguments("--js-flags=--expose-gc");
// option.addArguments("--enable-precise-memory-info");
// option.addArguments("--disable-popup-blocking");
// option.addArguments("--disable-default-apps");
// option.addArguments("--disable-infobars");



const rootURL = 'https://staging.compliancedepartment.online'
const waitUntilTime = 15000

var Browser = function () {

  this.openBrowser = function() {
    let option = new chrome.Options()
    // option.addArguments('start-fullscreen')
    option.addArguments('--headless')
    option.addArguments('--no-sandbox')
    option.addArguments('--disable-dev-shm-usage')
    
    this.driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(option)
      .build()
  }
  this.By = By

  this.rootURL = rootURL

  // visit a webpage 
  this.visit = async function (path = '') {
    this.openBrowser()

    let link = this.rootURL + path
    if (path.match(/^https?:\/\//)) {
      link = path
    }
    return await this.driver.get(link)
  }

  // quit current session
  this.quit = async function () {
    return await this.driver.quit()
  }

  this.clearSession = async function () {
    
  }

  // wait and find a specific element with it's id
  this.findById = async function (id) {
    await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element')
    return await this.driver.findElement(By.id(id))
  }

  // wait and find a specific element with it's name
  this.findByName = async function (name) {
    await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element')
    return await this.driver.findElement(By.name(name))
  }

  this.querySelectorAll = async function(css) {
    await this.driver.wait(until.elementsLocated(By.css(name)), 15000, 'Looking for element')
    return await this.driver.findElements(By.css(css))
  }

  // wait and find using a css selector
  this.querySelector = async function (selector, mostBeVisible = true) {
    const queryMethod = this.isXpath(selector) ? By.xpath(selector) : By.css(selector)
    const el = await this.driver.wait(
      until.elementLocated(queryMethod),
      waitUntilTime
    )
    if (!mostBeVisible) {
      return el
    }
    return await this.driver.wait(until.elementIsVisible(el), waitUntilTime)
  }

  // wait and find using a css selector
  this.queryXpath = async function (selector) {
    const el = await this.driver.wait(
      until.elementLocated(By.xpath(selector)),
      waitUntilTime
    )

    return await this.driver.wait(until.elementIsVisible(el), waitUntilTime)
  }

  // fill input web elements
  this.fill = async function (el, txt) {
    return await el.sendKeys(txt)
  }

  this.selectDropdownIndex = async function (parent, index) {
    let option = await this.querySelector(`${parent} ${this.isXpath(parent) ? '/': ''} button`)
    await option.click()

    let query = this.isXpath(parent) ? `(${parent}//ul//a)[${index}]` : `${parent}.open li:nth-of-type(${index}) a`
    option = await this.querySelector(query)
    await option.click()
    return option
  }

  this.selectDropdownValue = async function (parent, value) {
    let option = await this.querySelector(`${parent}${this.isXpath(parent) ? '/button': ' button'}`)
    await option.click()
    
    option = await this.queryXpath(`${this.isXpath(parent) ? parent: ''}//ul//*[contains(text(),'${value}')]`)
    await option.click()
    
    return option
  }


  this.queryAndFill = async function (selector, text) {
    const anchor = await this.querySelector(selector)
    await anchor.sendKeys(text)
    return anchor
  }

  this.click = async function (selector) {
    const anchor = await this.querySelector(selector)
    return await anchor.click()
  }

  this.isXpath = function(query) {
    return query ? query.match(/(^\/\/|\(\/\/)/) : false
  }
}

module.exports = Browser