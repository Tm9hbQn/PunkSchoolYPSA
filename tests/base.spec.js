const { test, expect } = require('@playwright/test');

test('Punk School Base renders without errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', err => {
    errors.push(err.message);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto('http://localhost:3000');

  // Verify title
  await expect(page).toHaveTitle(/Punk School Base/);

  // Wait for the main text to appear
  await page.waitForSelector('text=★ REBEL BASE ★');

  // Verify key components
  const rebelText = page.locator('text=★ REBEL BASE ★');
  await expect(rebelText).toBeVisible();

  // Make sure we have no runtime errors
  expect(errors.length).toBe(0);
});
