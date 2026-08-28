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

async function undersizedTargets(page: import('@playwright/test').Page, minimum: number): Promise<Array<{ label: string; width: number; height: number }>> {
  return page.locator('a, button, input, summary').evaluateAll((elements, minimumSize) => elements.flatMap((element) => {
    const style = getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || !element.getClientRects().length) return [];
    if (element instanceof HTMLInputElement && ['checkbox', 'radio'].includes(element.type) && element.closest('label')) return [];
    const { width, height } = element.getBoundingClientRect();
    return width < minimumSize || height < minimumSize
      ? [{ label: element.getAttribute('aria-label') ?? element.textContent?.trim() ?? element.tagName, width, height }]
      : [];
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
  expect(await page.locator('main').evaluate((main) => main.scrollWidth <= main.clientWidth)).toBe(true);
  expect(await visibleTextBelow(page, 16)).toEqual([]);
  expect(await undersizedTargets(page, 44)).toEqual([]);
  expect([...requestOrigins]).toEqual([new URL(page.url()).origin]);
  expect(errors).toEqual([]);
});

test('demo is accessible, contained, and uses the notebook layout', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/demo/?demo=1');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
  expect(await page.locator('h1').count()).toBe(1);
  expect(await page.locator('main').count()).toBe(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(await page.locator('main').evaluate((main) => main.scrollWidth <= main.clientWidth)).toBe(true);
  expect(await visibleTextBelow(page, 16)).toEqual([]);
  expect(await undersizedTargets(page, 44)).toEqual([]);
  expect(errors).toEqual([]);
});

test('one click exposes the first ranked cause in the 390 by 844 viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL('/demo/?demo=1');
  const reportTitle = await page.locator('#report-title').boundingBox();
  const firstCause = await page.locator('#demo-causes > li').first().boundingBox();
  expect(reportTitle, 'report heading has a layout box').not.toBeNull();
  expect(firstCause, 'first ranked cause has a layout box').not.toBeNull();
  expect(reportTitle!.y).toBeLessThan(844);
  expect(firstCause!.y).toBeLessThan(844);
});

test('each route has unique metadata and the shared skeleton', async ({ page }) => {
  const routes = [
    ['/', "CSS Cause Map — find a layout gap's CSS cause"],
    ['/demo/?demo=1', 'Demo — CSS Cause Map'],
    ['/privacy/', 'Privacy — CSS Cause Map'],
    ['/terms/', 'Terms — CSS Cause Map'],
    ['/404/', 'Page not found — CSS Cause Map']
  ] as const;
  for (const [route, title] of routes) {
    await page.goto(route);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /social-card\.jpg/);
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
    await expect(page.getByText('Built by Param Factory · Version 1.0.1')).toBeVisible();
  }
});

test('every internal site and download link resolves from the built site', async ({ page, request }) => {
  const routes = ['/', '/demo/?demo=1', '/privacy/', '/terms/', '/404/'];
  const checked = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const links = await page.locator('a[href]').evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('href') ?? ''));
    for (const href of links) {
      if (!href.startsWith('/') || href.startsWith('/#')) continue;
      const target = new URL(href, page.url()).pathname + new URL(href, page.url()).search;
      if (checked.has(target)) continue;
      checked.add(target);
      const response = await request.get(target);
      expect(response.status(), `${route} links to ${target}`).toBe(200);
    }
  }
  expect([...checked]).toEqual(expect.arrayContaining(['/', '/demo/?demo=1', '/privacy/', '/terms/', '/downloads/css-cause-map-chrome.zip']));
});

test('route navigation and browser back focus and announce each heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeFocused();
  await page.getByRole('link', { name: 'Privacy', exact: true }).first().click();
  await expect(page).toHaveURL('/privacy/');
  await expect(page.locator('h1')).toBeFocused();
  await expect(page.locator('#route-announcer')).toContainText('How CSS Cause Map handles your data');
  await page.goBack();
  await expect(page).toHaveURL('/');
  await expect(page.locator('h1')).toBeFocused();
});

test('the designed not-found route returns a way back', async ({ page }) => {
  await page.goto('/404/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page is not in the notebook');
  await expect(page.getByRole('link', { name: 'Return to CSS Cause Map' })).toHaveAttribute('href', '/');
});

test('cached shell remains available offline after service-worker activation', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);

  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Find the CSS rule');
  await context.setOffline(false);
});
