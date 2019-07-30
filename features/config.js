/**
 * Configure the test suite
 * https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/api_reference.md
 */
const { After, AfterAll, Before, BeforeAll, Status, defineParameterType, setDefaultTimeout, setWorldConstructor } = require('cucumber')
const browser = require('./supports/browser')


// Timeout, in milliseconds, for puppeteer actions
setDefaultTimeout(60 * 1000)

// `BrowserScope` is provided to all hooks and test steps in a scenario as `this`
setWorldConstructor(browser)

// String environment variable.  If the string value starts with '$', it's assumed to be the key for an environment variable.
defineParameterType({
  regexp: /"([^"]*)"/,
  transformer: (string) => string.startsWith('$') ? process.env[string.slice(1)] : string,
  name: 'string-env',
  useForSnippets: false
})

AfterAll(async function() {
  // await this.quit()
})
