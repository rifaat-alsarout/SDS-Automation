import { test, expect } from '@playwright/test';

test.describe('Enhanced Responsive View Tests', () => {
  test('Homepage - Enhanced Responsive View', async ({ page }) => {
    // Step 1: Navigate to the homepage
    await page.goto('https://s-d-s.co.uk/');

    // Step 2: Define viewport sizes to test
    const viewports = [
      { name: 'Desktop', viewport: { width: 1280, height: 900 } }, // Slightly taller desktop viewport
      { name: 'Tablet', viewport: { width: 768, height: 1024 } }, // Example tablet size
      { name: 'Mobile', viewport: { width: 375, height: 667 } },  // Example mobile size
    ];

    // Step 3: Loop through viewports and verify layout
    for (const vp of viewports) {
      console.log(`Testing viewport: ${vp.name}`);
      await page.setViewportSize(vp.viewport);

      // Wait for header to be present and visible explicitly with increased timeout
      await page.waitForSelector('header.header img.pwr-header-logo__img', { state: 'visible', timeout: 30000 }); // 

      // Basic layout checks (adjust locators as needed for your page)
      await expect(page.locator('header.header img.pwr-header-logo__img')).toBeVisible({timeout: 30000});
      await expect(page.locator('footer')).toBeVisible({timeout: 30000}); 
      await expect(page.locator('main, section')).toBeVisible({timeout: 30000}); 

      // Add more specific responsive checks here if needed
      // Example: Check if navigation menu changes to hamburger on mobile (adapt locator)
      // if (vp.name === 'Mobile') {
      //   await expect(page.locator('.hamburger-menu-icon')).toBeVisible(); // Example mobile menu locator
      // }

      console.log(`Homepage layout looks good on ${vp.name}`);
    }
  });
});