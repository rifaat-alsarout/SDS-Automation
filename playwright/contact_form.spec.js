import { test, expect } from '@playwright/test';

test('Support Portal › Validate New Support Ticket Form', async ({ page, context }) => {
  // Step 1: Navigate to the Contact page
  await page.goto('https://s-d-s.co.uk/contact');

  // Step 2: Click on "Login to our Support Portal," which opens a new tab
  const [supportPage] = await Promise.all([
    context.waitForEvent('page'), // Wait for the new page to open
    page.locator('a.pwr-cta_button[title="Button Login to our Support Portal"]').click(),
  ]);

  // Step 3: Verify navigation to the Freshdesk login page
  await supportPage.waitForLoadState('domcontentloaded');
  await expect(supportPage).toHaveURL(/shelton.freshdesk.com\/support\/login/);

  // Step 4: Click "New Support Ticket" to start a new ticket request
  const newTicketButton = supportPage.locator('a.btn.btn-newticket[href="/support/tickets/new"]');
  await newTicketButton.click();

  // Step 5: Verify that we have navigated to the ticket submission page
  await supportPage.waitForLoadState('domcontentloaded');
  await expect(supportPage).toHaveURL(/shelton.freshdesk.com\/support\/tickets\/new/);

  // Step 6: Click "Submit" without filling any fields to trigger validation
  const submitButton = supportPage.locator('#helpdesk_ticket_submit');
  await submitButton.click();

  // Step 7: Verify that validation messages appear for required fields
  const emailError = supportPage.locator('#helpdesk_ticket_email-error');
  const subjectError = supportPage.locator('#helpdesk_ticket_subject-error');

  await expect(emailError).toBeVisible({ timeout: 5000 });
  await expect(emailError).toHaveText("This field is required.");
  await expect(subjectError).toBeVisible({ timeout: 5000 });
  await expect(subjectError).toHaveText("This field is required.");

  console.log("Required field validation successful");

  // Step 8: Fill in the form with valid data
  await supportPage.fill('#helpdesk_ticket_email', 'test@example.com'); // Enter valid email
  await supportPage.fill('#helpdesk_ticket_subject', 'Test Subject'); // Enter a subject
  await supportPage.locator('.redactor_editor').fill('This is a test message.'); // Enter message content

  // Step 9: Verify that validation messages disappear after entering valid data
  await expect(emailError).not.toBeVisible();
  await expect(subjectError).not.toBeVisible();

  console.log("Form filled successfully, errors cleared");
});
