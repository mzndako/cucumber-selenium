const selector = require('../selectors/pa-request')

const pa_request = {
  go: async function (page) {
    await this.visit(page.indexOf('/') > -1 ? page : selector[page])
  },
  clickRequestLink: async function() {
    await this.click(selector['PA Request Button'])
  },
  click: async function(location) {
    await this.click(selector[location])
  },
  clickButtonXpath: async function(location) {
    await this.click(`//button[contains(text(), '${location}')]`)
  },
  visible: async function(location) {
    await this.querySelector(selector[location])
  },
  fillIn: async function(location, value) {
    await this.queryAndFill(selector[location], value)
  },
  selectDropdownValue: async function(value, location) {
    await this.selectDropdownValue(selector[location], value)
  },
  textVisible: async function(text) {
    await this.queryXpath(`//*[contains(text(),'${text}')]`)
  },
  login: async function(email, password, requestType) {
    await this.queryAndFill(selector.email, email)
    await this.queryAndFill(selector.password, password)
    await this.selectDropdownValue(selector['Type of Request'], requestType)
    await this.click(selector['PA Submit Button'])
  },
  selectResponseDropdown: async function(type, location, select) {
    const input = await this.querySelector(selector[location])
    await input.sendKeys(type)

    const option = await this.queryXpath(`(${selector[location]}/..//li/a)[1]`)
    await option.click()
    
    await this.driver.sleep(5000)

    const input2 = await this.querySelector(selector[location])
    return await input2.getText()
  },
  resetPublicTrade: async function() {
    // await selectButtonDropDown('.trade-details.select-button', 1)
  }

}

module.exports = pa_request