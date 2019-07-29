const { Given, When, Then } = require('cucumber')
// const expect = require('expect')
const pa_request = require('../supports/pages/pa-request')

Given('No current login user', () => {

})

When('I access the {string}', pa_request.go)

When('I open {string}', pa_request.go)

Then('I should see {string}', pa_request.visible)

Then('I should see an error message {string}', pa_request.textVisible)

When('I clicked on it', pa_request.clickRequestLink)

Given('a user with the email {string} with the password {string} is not registered', (email, password)=>{

})

When('I fill in {string} with {string}', pa_request.fillIn)

When('I click on {string}', pa_request.click)

When('I reset the form', pa_request.resetPublicTrade)

// When('I fill in {string} for {string} and I select the first option', pa_request.type)

Then('I select {string} for {string}', pa_request.selectDropdownValue)

Then('I should see text {string}', pa_request.textVisible)

Given('I am logged into {string} with email as {string} and password as {string}', pa_request.login)

Given('I type in {string} for {string} and I select the {string} option', async function(type, location, option){
  const text = await pa_request.selectResponseDropdown.call(this, type, location, option)
  console.log(`${text} option was selected`)
})

