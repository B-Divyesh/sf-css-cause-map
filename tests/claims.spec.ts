import { execFile } from 'node:child_process';
import { access, cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { chromium, expect, test } from '@playwright/test';

const execFileAsync = promisify(execFile);
const root = resolve(import.meta.dirname, '..');

test.describe.configure({ mode: 'serial' });

test.beforeAll(async () => {
  await execFileAsync('npm', ['run', 'build'], { cwd: root, maxBuffer: 10 * 1024 * 1024 });
});

test('@claim:ranked-cause-report renders the complete sample evidence', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('CSS Cause Map — rank CSS rules shaping layout gaps');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Rank the CSS rules shaping a layout gap');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    "Rank the CSS rules and parent elements most likely shaping an element's size, position, or gap."
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', 'CSS Cause Map — rank CSS rules shaping layout gaps');
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', 'CSS Cause Map — rank CSS rules shaping layout gaps');

  const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8')) as { description: string };
  const manifestSource = await readFile(resolve(root, 'wxt.config.ts'), 'utf8');
  const catalog = (await readFile(resolve(root, '.factory/catalog-description.txt'), 'utf8')).trim();
  expect(packageJson.description).toBe('Rank the CSS rules and parent elements shaping a layout problem.');
  expect(manifestSource).toContain("description: 'Rank the CSS rules and parent elements shaping a live layout.'");
  expect(catalog).toBe('Rank the CSS rules and parent elements shaping an element’s size, position, or gap.');
  expect(catalog.length).toBeLessThanOrEqual(120);

  await page.goto('/demo/?demo=1');
  await expect(page.getByText('article.product-card', { exact: false }).first()).toBeVisible();
  await expect(page.getByRole('region', { name: 'Final size and position' }).getByText('312 px')).toBeVisible();
  await expect(page.locator('#demo-causes > li')).toHaveCount(3);
  await expect(page.locator('#demo-causes > li').first()).toHaveAttribute('data-property', 'grid-template-columns');
  await expect(page.locator('#demo-causes > li').first()).toContainText('Reason:');
  await expect(page.locator('#demo-causes > li').first()).toContainText('Rule to test:');
  await expect(page.getByRole('row', { name: /section.results grid/ })).toBeVisible();
});

test('@claim:demo-isolation keeps normal storage untouched and reset is deterministic', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('real:user-preference', 'keep-me'));
  await page.goto('/?demo=1');
  await expect(page).toHaveURL('/demo/?demo=1');
  await expect(page.getByText('Demo — sample data, nothing is saved to your real data')).toBeVisible();
  await page.getByRole('button', { name: 'Capture again' }).click();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.locator('#demo-width')).toHaveText('312 px');

  const storage = await page.evaluate(() => Object.fromEntries(Object.entries(localStorage)));
  expect(storage['real:user-preference']).toBe('keep-me');
  expect(Object.keys(storage).filter((key) => key !== 'real:user-preference').every((key) => key.startsWith('demo:'))).toBe(true);

  await page.getByRole('link', { name: 'Start for real' }).click();
  await expect(page).toHaveURL('/');
  expect(await page.evaluate(() => localStorage.getItem('real:user-preference'))).toBe('keep-me');
  expect(await page.evaluate(() => localStorage.getItem('demo:css-cause-map:state'))).toBeNull();
});

test('@claim:offline-core reloads and runs the demo offline', async ({ page, context }) => {
  await page.goto('/demo/?demo=1');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Inspect a sample layout gap');
  await page.getByRole('button', { name: 'Capture again' }).click();
  await expect(page.locator('#comparison')).toContainText('width −24 px');
  await context.setOffline(false);
});

test('@claim:private-exports downloads both formats without private sample details', async ({ page }) => {
  await page.goto('/demo/?demo=1');
  const jsonDownloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export JSON' }).click();
  const jsonDownload = await jsonDownloadPromise;
  const json = await readFile(await jsonDownload.path(), 'utf8');
  expect(json).toContain('grid-template-columns');
  expect(json).toContain('article.product-card');
  expect(json).not.toContain('customer=secret');
  expect(json).not.toContain('#offer');
  expect(json).not.toContain('Canvas daypack');

  await page.getByLabel('Replace CSS selectors with anonymous labels').check();
  const htmlDownloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export HTML' }).click();
  const htmlDownload = await htmlDownloadPromise;
  const html = await readFile(await htmlDownload.path(), 'utf8');
  expect(html).toContain('element-1');
  expect(html).not.toContain('product-card');
  expect(html).not.toContain('customer=secret');
  expect(html).not.toContain('#offer');
  expect(html).not.toContain('Canvas daypack');
});

test('@claim:capture-comparison shows exact measurement and page changes', async ({ page }) => {
  await page.goto('/demo/?demo=1');
  await expect(page.locator('#demo-width')).toHaveText('312 px');
  await page.getByRole('button', { name: 'Capture again' }).click();
  await expect(page.locator('#demo-width')).toHaveText('288 px');
  await expect(page.locator('#comparison')).toContainText('width −24 px');
  await expect(page.locator('#changes-copy')).toContainText('class changed');
});

test('@claim:free-core exposes analysis and both exports without a payment gate', async ({ page }) => {
  await page.goto('/demo/?demo=1');
  await expect(page.getByRole('heading', { name: 'Ranked CSS causes' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export JSON' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Export HTML' })).toBeEnabled();
  await expect(page.locator('a[href*="checkout"], [class*="paywall"], [id*="license"]')).toHaveCount(0);
});

test('@claim:privacy-boundaries keeps the sample and packaged extension local', async ({ page }) => {
  const origins = new Set<string>();
  page.on('request', (request) => origins.add(new URL(request.url()).origin));
  await page.goto('/demo/?demo=1');
  await page.getByRole('button', { name: 'Capture again' }).click();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await page.getByLabel('Replace CSS selectors with anonymous labels').check();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export JSON' }).click();
  await downloadPromise;
  expect([...origins]).toEqual([new URL(page.url()).origin]);

  const manifest = JSON.parse(await readFile(resolve(root, '.output/chrome-mv3/manifest.json'), 'utf8')) as Record<string, unknown>;
  expect(manifest.host_permissions).toBeUndefined();
  expect(manifest.content_scripts).toBeUndefined();
  const extensionSources = await Promise.all([
    readFile(resolve(root, 'entrypoints/background.ts'), 'utf8'),
    readFile(resolve(root, 'entrypoints/picker.ts'), 'utf8'),
    readFile(resolve(root, 'entrypoints/sidepanel/main.ts'), 'utf8')
  ]);
  expect(extensionSources.join('\n')).not.toMatch(/\b(fetch|XMLHttpRequest|WebSocket)\b/);
});

test('@claim:manifest-permissions ships the exact conservative MV3 permission set', async () => {
  const manifest = JSON.parse(await readFile(resolve(root, '.output/chrome-mv3/manifest.json'), 'utf8')) as Record<string, unknown>;
  expect(manifest.manifest_version).toBe(3);
  expect(manifest.permissions).toEqual(['activeTab', 'scripting', 'storage', 'sidePanel']);
  expect(manifest.host_permissions).toBeUndefined();
  expect(manifest.content_scripts).toBeUndefined();
});

test('@claim:picker-inputs selects by pointer and keyboard and cancels with Escape', async () => {
  const unpacked = resolve(root, '.output/chrome-mv3');
  const temporaryRoot = await mkdtemp(resolve(tmpdir(), 'css-cause-map-picker-'));
  const extensionPath = resolve(temporaryRoot, 'extension');
  const profile = resolve(temporaryRoot, 'profile');
  await cp(unpacked, extensionPath, { recursive: true });
  const manifestPath = resolve(extensionPath, 'manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as Record<string, unknown>;
  manifest.host_permissions = ['http://127.0.0.1:4173/*'];
  await writeFile(manifestPath, JSON.stringify(manifest));
  const context = await chromium.launchPersistentContext(profile, {
    channel: 'chromium', headless: true,
    args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`]
  });
  try {
    const worker = context.serviceWorkers()[0] ?? await context.waitForEvent('serviceworker');
    const fixture = await context.newPage();
    await fixture.goto('http://127.0.0.1:4173/fixtures/picker.html');
    const panel = await context.newPage();
    const extensionUrl = new URL(worker.url());
    await panel.goto(`${extensionUrl.protocol}//${extensionUrl.host}/sidepanel.html`);

    const startPicker = async (): Promise<void> => {
      await worker.evaluate(async () => {
        const [tab] = await chrome.tabs.query({ url: 'http://127.0.0.1:4173/fixtures/picker.html' });
        if (!tab?.id) throw new Error('Fixture tab not found');
        await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['/picker.js'] });
        await chrome.tabs.sendMessage(tab.id, { type: 'CCM_START_PICKER' });
      });
    };

    expect(await fixture.evaluate(() => (window as Window & { __CCM_PICKER_READY__?: boolean }).__CCM_PICKER_READY__)).toBeUndefined();
    expect(await fixture.locator('[data-ccm-overlay]').count()).toBe(0);
    await startPicker();
    await fixture.bringToFront();
    const box = await fixture.locator('#pointer-target').boundingBox();
    if (!box) throw new Error('Pointer target has no box');
    await fixture.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await fixture.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await expect(panel.locator('#target-selector')).toHaveText('div#pointer-target');

    await startPicker();
    await fixture.bringToFront();
    await fixture.keyboard.press('Tab');
    await fixture.keyboard.press('Enter');
    await expect(panel.locator('#target-selector')).toHaveText('button#keyboard-target');

    await startPicker();
    await fixture.bringToFront();
    await fixture.keyboard.press('Escape');
    await expect(panel.locator('#status-copy')).toContainText('Analysis ready');
  } finally {
    await context.close();
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

test('@claim:local-report-log saves private notes and keeps the newest 100 reports', async () => {
  const extensionPath = resolve(root, '.output/chrome-mv3');
  const profile = await mkdtemp(resolve(tmpdir(), 'css-cause-map-claim-'));
  const context = await chromium.launchPersistentContext(profile, {
    channel: 'chromium',
    headless: true,
    args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`]
  });
  try {
    const worker = context.serviceWorkers()[0] ?? await context.waitForEvent('serviceworker');
    const extensionUrl = new URL(worker.url());
    const page = await context.newPage();
    await page.goto(`${extensionUrl.protocol}//${extensionUrl.host}/sidepanel.html`);
    const sender = await context.newPage();
    await sender.goto(`${extensionUrl.protocol}//${extensionUrl.host}/sidepanel.html`);
    await sender.evaluate(async () => {
      await chrome.runtime.sendMessage({
        type: 'CCM_ANALYSIS',
        report: {
          schema: 'css-cause-map/v1', capturedAt: '2026-08-28T00:00:00.000Z', page: { url: 'https://example.test/layout' },
          target: { selector: 'article.product-card', tag: 'article' },
          box: { x: 1, y: 2, width: 312, height: 184, margin: ['0px', '0px', '0px', '0px'], padding: ['8px', '8px', '8px', '8px'], border: ['0px', '0px', '0px', '0px'] },
          causes: [{ id: 'grid-1', property: 'grid-template-columns', value: 'repeat(3, 1fr)', score: 93, confidence: 'strong', scope: 'parent', origin: 'section.results', distance: 1, reason: 'The parent creates three tracks.' }],
          ancestors: [], changes: [], caveat: 'Visible CSS evidence, not internal decisions.'
        }
      });
    });
    await expect(page.locator('#results')).toBeVisible();
    const seeded = Array.from({ length: 99 }, (_, index) => ({
      report: { target: { selector: `article.seed-${index}` } }, note: `seed ${index}`, savedAt: `2026-08-28T00:00:${String(index).padStart(2, '0')}.000Z`
    }));
    await page.evaluate(async (entries) => chrome.storage.local.set({ ccm_report_log: entries }), seeded);
    await page.getByLabel('Private report note').fill('Reproduced at 390 px');
    await page.getByRole('button', { name: 'Save to report log' }).click();
    await expect(page.locator('#notice')).toContainText('Saved locally to your report log.');
    const stored = await page.evaluate(async () => (await chrome.storage.local.get('ccm_report_log')).ccm_report_log);
    expect(stored).toHaveLength(100);
    expect(stored[0].note).toBe('Reproduced at 390 px');
    expect(stored[0].report.target.selector).toBe('article.product-card');
    await page.getByLabel('Private report note').fill('Second saved note');
    await page.getByRole('button', { name: 'Save to report log' }).click();
    const capped = await page.evaluate(async () => (await chrome.storage.local.get('ccm_report_log')).ccm_report_log);
    expect(capped).toHaveLength(100);
    expect(capped[0].note).toBe('Second saved note');
    expect(capped.at(-1).note).not.toBe('seed 0');
  } finally {
    await context.close();
    await rm(profile, { recursive: true, force: true });
  }
});

test('@claim:local-data-deletion clears every saved report and private note', async () => {
  const extensionPath = resolve(root, '.output/chrome-mv3');
  const profile = await mkdtemp(resolve(tmpdir(), 'css-cause-map-delete-'));
  const context = await chromium.launchPersistentContext(profile, {
    channel: 'chromium',
    headless: true,
    args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`]
  });
  try {
    const worker = context.serviceWorkers()[0] ?? await context.waitForEvent('serviceworker');
    const extensionUrl = new URL(worker.url());
    const page = await context.newPage();
    await page.goto(`${extensionUrl.protocol}//${extensionUrl.host}/sidepanel.html`);
    await page.evaluate(async () => chrome.storage.local.set({
      ccm_report_log: [{
        report: {
          schema: 'css-cause-map/v1', capturedAt: '2026-08-28T00:00:00.000Z', page: { url: 'https://example.test/layout' },
          target: { selector: 'article.private-card', tag: 'article' },
          box: { x: 1, y: 2, width: 312, height: 184, margin: ['0px', '0px', '0px', '0px'], padding: ['8px', '8px', '8px', '8px'], border: ['0px', '0px', '0px', '0px'] },
          causes: [], ancestors: [], changes: [], caveat: 'Visible evidence.'
        },
        note: 'Private customer reproduction note',
        savedAt: '2026-08-28T00:00:00.000Z'
      }]
    }));
    await page.getByRole('button', { name: 'Open saved reports' }).click();
    await expect(page.getByText('article.private-card')).toBeVisible();
    await expect(page.getByText('Private customer reproduction note', { exact: false })).toBeVisible();
    await page.getByRole('button', { name: 'Clear report log' }).click();
    await page.getByRole('button', { name: 'Confirm clear report log' }).click();
    await expect(page.locator('#notice')).toContainText('All saved reports and private notes were deleted.');
    expect(await page.evaluate(async () => (await chrome.storage.local.get('ccm_report_log')).ccm_report_log)).toBeUndefined();
    await page.reload();
    await page.getByRole('button', { name: 'Open saved reports' }).click();
    await expect(page.getByText('No saved reports yet.')).toBeVisible();
    await expect(page.getByText('article.private-card')).toHaveCount(0);
    await expect(page.getByText('Private customer reproduction note', { exact: false })).toHaveCount(0);
  } finally {
    await context.close();
    await rm(profile, { recursive: true, force: true });
  }
});

test('@claim:production-build creates the complete extension and static package', async () => {
  await access(resolve(root, '.output/chrome-mv3/manifest.json'));
  await access(resolve(root, '.output/css-cause-map-1.0.1-chrome.zip'));
  await access(resolve(root, 'dist/site/index.html'));
  await access(resolve(root, 'dist/site/demo/index.html'));
  await access(resolve(root, 'dist/site/downloads/css-cause-map-chrome.zip'));
  const result = await execFileAsync('unzip', ['-t', resolve(root, 'dist/site/downloads/css-cause-map-chrome.zip')]);
  expect(result.stdout).toContain('No errors detected');
});
