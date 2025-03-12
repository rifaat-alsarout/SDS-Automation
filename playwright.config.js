process.env.DEBUG = 'pw:config'; // Enable Playwright debugging logs

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    browserName: 'chromium',
    headless: true,
    actionTimeout: 90000, // Timeout for individual actions
  },
  timeout: 500000, // Test-level timeout 
  testMatch: ["*.spec.js"], // Proper format for test file matching
};

module.exports = config;
