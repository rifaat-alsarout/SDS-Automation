import { test, expect } from '@playwright/test';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

test('Performance Test - Page Load Time', async ({ page }) => {
    // Step 1: Record the start time before navigation
    const startTime = Date.now();
    
    // Step 2: Navigate to the target website
    await page.goto('https://s-d-s.co.uk/'); // Replace with your actual website URL

    // Step 3: Calculate the total page load time
    const loadTime = Date.now() - startTime;

    // Step 4: Log the page load time for debugging
    console.log(`Page loaded in ${loadTime}ms`);

    // Step 5: Ensure the page load time is within an acceptable threshold (e.g., 35 seconds)
    expect(loadTime).toBeLessThan(60000); // Adjust as needed based on real performance benchmarks
});

// Function to run Lighthouse audits (Performance & Accessibility)
async function runLighthouse(url) {
    // Step 1: Launch a headless Chrome instance for Lighthouse analysis
    const chrome = await launch({ chromeFlags: ['--headless'] });

    // Step 2: Run Lighthouse against the given URL
    const result = await lighthouse(url, { port: chrome.port });

    // Step 3: Extract and log the key Lighthouse scores
    console.log(`Lighthouse Performance Score: ${result.lhr.categories.performance.score * 100}`);
    console.log(`Lighthouse Accessibility Score: ${result.lhr.categories.accessibility.score * 100}`);

    // Step 4: Close the Chrome instance after the test
    await chrome.kill();
}

// Playwright test to evaluate accessibility using Lighthouse
test('Lighthouse Accessibility Test', async () => {
    await runLighthouse('https://s-d-s.co.uk/');
});
