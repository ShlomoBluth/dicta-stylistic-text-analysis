const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: true,
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 60000,
  pageLoadTimeout: 180000,
  failOnStatusCode: false,
  reporter: 'cypress-multi-reporters',
  retries: {
    runMode: 1,
    openMode: 0,
  },
  reporterOptions: {
    configFile: 'dicta-shared/reporter-config.json',
  },
  env: {
    DEV_URL: '',
    LIVE_URL: 'https://generalclassify.dicta.org.il/#/',
    TOOL_TESTS: true,
    REQUESTS_TESTS: true,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://generalclassify.dicta.org.il/#/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
