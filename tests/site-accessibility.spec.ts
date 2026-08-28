import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function visibleTextBelow(page: import('@playwright/test').Page, minimum: number): Promise<Array<{ text: string; size: number }>> {
  return page.locator('body *').evaluateAll((elements, minimumSize) => elements.flatMap((element) => {
    const hasOwnText = [...element.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
    const style = getComputedStyle(element);
    if (!hasOwnText || style.display === 'none' || style.visibility === 'hidden' || element.getAttribute('aria-hidden') === 'true') return [];
    const size = Number.parseFloat(style.fontSize);
    return size < minimumSize ? [{ text: element.textContent?.trim().slice(0, 60) ?? '', size }] : [];
  }), minimum);
}

async function undersizedTargets(page: import('@playwright/test').Page, minimum: number): Promise<Array<{ label: string; height: number }>> {
  return page.locator('a, button, input, summary').evaluateAll((elements, minimumSize) => elements.flatMap((element) => {
    const style = getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || !element.getClientRects().length) return [];
    const height = element.getBoundingClientRect().height;
    return height < minimumSize ? [{ label: element.getAttribute('aria-label') ?? element.textContent?.trim() ?? element.tagName, height }] : [];
  }), minimum);
}

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
  expect(await visibleTextBelow(page, 16)).toEqual([]);
  expect(await undersizedTargets(page, 44)).toEqual([]);
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
