require('chromedriver')
require('geckodriver')
require('selenium-webdriver/chrome')
require('selenium-webdriver/firefox')

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let option = new chrome.Options();
// option.addArguments('start-fullscreen');
option.addArguments('--headless')
option.addArguments('--no-sandbox')
option.addArguments('--disable-dev-shm-usage')

const rootURL = 'https://staging.compliancedepartment.online'
const waitUntilTime = 15000;

var Page = function () {
  this.driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(option)
    .build()
 
  this.By = By;

  this.rootURL = rootURL

  // visit a webpage 
  this.visit = async function (path = '') {
    let link = this.rootURL + path;
    if (path.match(/^https?:\/\//)) {
      link = path
    }
    return await this.driver.get(link);
  };

  // quit current session
  this.quit = async function () {
    return await this.driver.quit();
  };

  // wait and find a specific element with it's id
  this.findById = async function (id) {
    await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
    return await this.driver.findElement(By.id(id));
  };

  // wait and find a specific element with it's name
  this.findByName = async function (name) {
    await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
    return await this.driver.findElement(By.name(name));
  };

  this.querySelectorAll = async function(css) {
    await this.driver.wait(until.elementsLocated(By.css(name)), 15000, 'Looking for element');
    return await this.driver.findElements(By.css(css));
  }

  // wait and find using a css selector
  this.querySelector = async function (selector, mostBeVisible = true) {
    const el = await this.driver.wait(
      until.elementLocated(By.css(selector)),
      waitUntilTime
    )
    if (!mostBeVisible) {
      return el;
    }
    return await this.driver.wait(until.elementIsVisible(el), waitUntilTime)
  }

  // fill input web elements
  this.fill = async function (el, txt) {
    return await el.sendKeys(txt);
  };

  this.selectButtonDropDown = async function (parent, index) {
    option = await this.querySelector(`${parent} button`);
    await option.click()
    option = await this.querySelector(`${parent}.open li:nth-of-type(${index}) a`);
    await option.click();
    return option;
  }

  this.queryAndFill = async function (selector, text) {
    const anchor = await this.querySelector(selector);
    await anchor.sendKeys(text)
    return anchor
  }

}

module.exports = Page