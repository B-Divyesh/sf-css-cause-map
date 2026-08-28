import { execFile } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import AxeBuilder from '@axe-core/playwright';
import { chromium, expect, test } from '@playwright/test';

const execFileAsync = promisify(execFile);
const root = resolve(import.meta.dirname, '..');

test('packaged side panel transfers skip-link focus and meets its documented minimums', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'The packaged extension smoke test runs once in Chromium.');

  await execFileAsync('npm', ['run', 'build:extension'], { cwd: root });
  const profile = await mkdtemp(resolve(tmpdir(), 'css-cause-map-extension-'));
  const extensionPath = resolve(root, '.output/chrome-mv3');
  const context = await chromium.launchPersistentContext(profile, {
    channel: 'chromium',
    headless: true,
    args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`]
  });

  try {
    const worker = context.serviceWorkers()[0] ?? await context.waitForEvent('serviceworker');
    const page = await context.newPage();
    const extensionUrl = new URL(worker.url());
    await page.goto(`${extensionUrl.protocol}//${extensionUrl.host}/sidepanel.html`);

    await page.getByRole('link', { name: 'Skip to cause map' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();

    const axe = await new AxeBuilder({ page }).analyze();
    expect(axe.violations).toEqual([]);

    const undersizedText = await page.locator('body *').evaluateAll((elements) => elements.flatMap((element) => {
      const hasOwnText = [...element.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
      const style = getComputedStyle(element);
      if (!hasOwnText || style.display === 'none' || style.visibility === 'hidden' || element.getAttribute('aria-hidden') === 'true') return [];
      const size = Number.parseFloat(style.fontSize);
      return size < 14 ? [{ text: element.textContent?.trim().slice(0, 60) ?? '', size }] : [];
    }));
    expect(undersizedText).toEqual([]);

    const undersizedTargets = await page.locator('a, button, input, summary').evaluateAll((elements) => elements.flatMap((element) => {
      const style = getComputedStyle(element);
      if (style.display === 'none' || style.visibility === 'hidden' || !element.getClientRects().length) return [];
      if (element instanceof HTMLInputElement && ['checkbox', 'radio'].includes(element.type) && element.closest('label')) return [];
      const { width, height } = element.getBoundingClientRect();
      return width < 44 || height < 44
        ? [{ label: element.getAttribute('aria-label') ?? element.textContent?.trim() ?? element.tagName, width, height }]
        : [];
    }));
    expect(undersizedTargets).toEqual([]);
  } finally {
    await context.close();
    await rm(profile, { recursive: true, force: true });
  }
});
