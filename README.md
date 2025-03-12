# SDS-Automation
Automation Tests for SDS UK website
# Playwright Test Automation and Performance Testing

## Overview
This project utilizes **Playwright** for browser automation testing and **Lighthouse** for performance testing. The tests focus on verifying the **responsiveness** of the website across different devices and ensuring that key page elements (like logos, footers, and navigation links) are properly displayed. The **Lighthouse** performance test helps to measure the page load performance and accessibility score for the website.

## Requirements
Make sure you have the following installed before running the tests:

- **Node.js** (v14 or later)
- **npm** (v6 or later)

### Installing Playwright and Dependencies
1. Install Playwright by running the following in your terminal:

npm install playwright

Additionally, if you're using Lighthouse for performance tests, install it by running:
npm install -g lighthouse

Running Playwright Tests
To run the Playwright tests, use the following command:
npx playwright test --config playwright.config.js

Timeout Issues
If you encounter timeout issues during the tests, it's likely because the page load or elements are taking longer than expected to appear or load. In such cases, you can increase the timeout values in the test scripts and configuration file.

In the test scripts, locate and modify the timeout values passed to waitForSelector and expect functions (e.g., timeout: 30000 for 30 seconds).
In the configuration file (playwright.config.js), increase the test-level timeout by modifying the timeout value to a larger value, such as 1800000 (for 30 minutes).


Testing Features
1. Homepage Verification
This test ensures that the homepage has the correct title, URL, and key elements like the header and footer.

2. Navigation Test - Main Menu Links
This test verifies that the main menu links lead to the correct pages, and checks if the correct titles and URLs are present.

3. Responsive View
This test checks the homepage's responsiveness across different screen sizes such as desktop, tablet, and mobile. It ensures that key elements are visible and properly displayed.

4. Support Portal - Validate New Support Ticket Form
This test ensures the proper validation of the support ticket submission form in the Freshdesk support portal. It includes validation of required fields and proper error messages.


5. Lighthouse Performance Testing
You can run a Lighthouse performance test using the following command:
lighthouse https://www.s-d-s.co.uk --output html --output-path ./lighthouse-report.html
This will generate a Lighthouse report in HTML format, providing performance insights, accessibility scores, SEO, and more.

Notes:
-Timeouts have been adjusted for handling slow page loads and network issues.
-Consider using the Playwright Debug Mode (npx playwright codegen) for troubleshooting failing tests.
-All tests should pass successfully in a CI/CD pipeline with sufficient resources and internet connection.

