const { Given, When, Then } = require('cucumber')
// const expect = require('expect')
const actions = require('../supports/actions')

Given('No current login user', () => {})

When('I access the {string}', actions.go)

When('I visit {string}', actions.go)

When('I open {string}', actions.go)

Then('I should see {string}', actions.visible)

Then('I should see an error message {string}', actions.textVisible)

When('I clicked on it', actions.clickRequestLink)

Given('a user with the email {string} with the password {string} is not registered', (email, password)=>{})

When('I fill in {string} with {string}', actions.fillIn)

When('I click on {string}', actions.click)

When('I click on {string} button', actions.clickButtonXpath)

When('I reset the form', actions.resetPublicTrade)

Then('I select {string} for {string}', actions.selectDropdownValue)

Then('I should see text/form like {string}', actions.textVisible)

When('I am login with {string} as email {string} as password {string} as Type of Request', actions.login)

When('I type in {string} for {string} and I select option {int}', actions.selectResponseDropdown)

