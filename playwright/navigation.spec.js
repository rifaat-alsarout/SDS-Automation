// Enable Playwright debugging to log configuration-related details
process.env.DEBUG = 'pw:config';

const { test, expect } = require('@playwright/test');

test('Navigation Test - Main Menu Links', async ({ page }) => {
  console.time('navigation-page.goto');

  // Step 1: Navigate to the SDS homepage and wait up to 30 seconds for it to load
  await page.goto('https://www.s-d-s.co.uk/', { timeout: 30000 });
  console.timeEnd('navigation-page.goto');

  // Step 2: Handle the cookie banner if it appears and accept it 
  try {
    console.time('cookie-banner-accept');
    const cookieBannerButton = page.locator('#hs-eu-confirmation-button');

    // Wait for cookie banner visibility (max 5s), then click "Accept" (max 10s)
    if (await cookieBannerButton.isVisible({ timeout: 5000 })) {
      await cookieBannerButton.click({ timeout: 10000 });
      console.timeEnd('cookie-banner-accept');
    } else {
      console.log('Cookie banner not found.');
      console.timeEnd('cookie-banner-accept'); 
    }
  } catch (error) {
    console.error('Error handling cookie banner:', error);
  }

  // Step 3: Define navigation links with expected page titles and URLs
  const navigationLinks = [
    { name: 'Products', url: "https://s-d-s.co.uk/products", title: 'Products' },
    { name: 'Consultancy', url: "https://s-d-s.co.uk/consultancy", title: 'Consultancy' },
    { name: 'SDS Services', url: "https://s-d-s.co.uk/services", title: 'SDS Services' },
    { name: 'Support', url: "https://s-d-s.co.uk/support", title: 'Support' },
    { name: 'Events', url: "https://s-d-s.co.uk/events", title: 'Events' },
    { name: 'Latest News', url: "https://s-d-s.co.uk/blog", title: 'SDS Blog' },
    { name: 'Contact', url: "https://s-d-s.co.uk/contact", url_regex: /contact-sds/, title: 'Contact' }, // Using regex for flexible URL matching
  ];

  // Step 4: Loop through navigation links and validate navigation behavior
  for (const link of navigationLinks) {
    console.time(`click-${link.name}`);

    // Click on the menu item based on its role and name
    await page.locator('#pwr-js-header__menu').getByRole('menuitem', { name: link.name }).click({ timeout: 30000 });
    console.timeEnd(`click-${link.name}`);

    // Step 5: Verify the correct page title after navigation
    await expect(page).toHaveTitle(link.title);

    // Step 6: Verify the correct URL after navigation
    if (link.url) {
      await expect(page).toHaveURL(link.url);
    } else if (link.url_regex) {
      await expect(page).toHaveURL(link.url_regex);
    }

    // Step 7: Navigate back to the homepage before checking the next link
    console.time('loop-page.goto');
    await page.goBack({ timeout: 90000, waitUntil: 'load' });
    console.timeEnd('loop-page.goto');
  }
});
