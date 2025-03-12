import { test, expect } from '@playwright/test';

test('Landval Cloud Product Page › Verify page content and layout', async ({ page }) => {
  // Step 1: Navigate to the Landval Cloud product page
  await page.goto('https://s-d-s.co.uk/landval');

  // Step 2: Verify that the page title matches the expected value
  await expect(page).toHaveTitle("Landval");

  // Step 3: Check the hero section headline to ensure it displays correctly
  const headline = page.locator('h1#competitive-land-valuation-software');
  await expect(headline).toHaveText("COMPETITIVE LAND VALUATION SOFTWARE");

  // Step 4: Verify the hero section description text
  const description = page.locator('.pwr-sec-txt__left p').first();
  await expect(description).toHaveText(/Revolutionising Land Valuation for Private Developers./i);

  // Step 5: Confirm the visibility of the features section
  const featuresSection = page.locator('.pwr-sec-services');
  await expect(featuresSection).toBeVisible();

  // Step 6: Verify the presence and text of the "Book a Demo Now" button
  const demoButton = page.getByRole('link', { name: /Book a Demo Now/i });
  await expect(demoButton).toBeVisible();
  await expect(demoButton).toHaveText(/Book a Demo Now/i);

  // Step 7: Ensure the "Download PDF" button is available and has the correct attributes
  await page.waitForLoadState('networkidle'); // Ensure the page is fully loaded before proceeding

  const downloadButton = page.locator('a.pwr-cta_button', { hasText: 'Download PDF' });

  await expect(downloadButton).toBeVisible({ timeout: 10000 }); // Verify button visibility
  await expect(downloadButton).toHaveAttribute(
    'href',
    'https://25917974.fs1.hubspotusercontent-eu1.net/hubfs/25917974/landval.xlsx.zip'
  );
  await expect(downloadButton).toHaveText(/Download PDF/i);
});
