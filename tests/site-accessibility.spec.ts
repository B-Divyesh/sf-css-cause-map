import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('skip link transfers focus into the main landmark', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Skip to main content' }).focus();
  await page.keyboard.press('Enter');

  await expect(page.locator('main')).toBeFocused();
});

test('landing page stays accessible and contained at the configured viewport', async ({ page }) => {
  const errors: string[] = [];
  const requestOrigins = new Set<string>();
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('request', (request) => requestOrigins.add(new URL(request.url()).origin));

  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
  expect(await page.locator('h1').count()).toBe(1);
  expect(await page.locator('main').count()).toBe(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect([...requestOrigins]).toEqual([new URL(page.url()).origin]);
  expect(errors).toEqual([]);
});

test('cached shell remains available offline after service-worker activation', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);

  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Explain the gap');
  await context.setOffline(false);
});
