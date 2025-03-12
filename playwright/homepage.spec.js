const { test, expect } = require('@playwright/test');

test('Homepage Verification - Title and URL', async ({ page }) => {
  // First Step: Navigate to the SDS homepage
  await page.goto('https://www.s-d-s.co.uk/');

  // Second Step: Verify that the page title is as expected
  await expect(page).toHaveTitle('Social Housing Development Software | SDS UK'); 

  // Third Step: Verify that the URL is correct 
  await expect(page).toHaveURL('https://s-d-s.co.uk'); 
});
