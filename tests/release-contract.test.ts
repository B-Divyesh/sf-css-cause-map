import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '..');

async function jsonFile(path: string): Promise<Record<string, unknown>> {
  return JSON.parse(await readFile(resolve(root, path), 'utf8')) as Record<string, unknown>;
}

describe('release regression contracts', () => {
  it('prepares WXT types before every clean local quality gate', async () => {
    const packageJson = await jsonFile('package.json');
    const scripts = packageJson.scripts as Record<string, string>;

    expect(scripts['prepare:wxt']).toBe('wxt prepare');
    expect(scripts.pretypecheck).toContain('prepare:wxt');
    expect(scripts.pretest).toContain('prepare:wxt');
    expect(scripts['pretest:unit']).toContain('prepare:wxt');
    expect(scripts['pretest:claims']).toContain('prepare:wxt');
    expect(scripts['pretest:browser']).toContain('prepare:wxt');
  });

  it('ships static-site response policies with immutable asset caching', async () => {
    const config = await jsonFile('site/public/staticwebapp.config.json');
    const headers = config.globalHeaders as Record<string, string>;
    const routes = config.routes as Array<{ route: string; headers: Record<string, string> }>;
    const responseOverrides = config.responseOverrides as Record<string, { rewrite: string }>;

    expect(headers['Content-Security-Policy']).toContain("default-src 'self'");
    expect(headers['Content-Security-Policy']).toContain("connect-src 'self'");
    expect(headers['Content-Security-Policy']).not.toContain('api.sociobot.in');
    expect(headers['X-Frame-Options']).toBe('DENY');
    expect(headers['Permissions-Policy']).toContain('camera=()');
    expect(headers['Cache-Control']).toContain('max-age=300');
    expect(responseOverrides['404']?.rewrite).toBe('/404/index.html');
    for (const route of ['/assets/*', '/media/*', '/downloads/*']) {
      expect(routes.find((entry) => entry.route === route)?.headers['Cache-Control']).toBe('public, max-age=31536000, immutable');
    }
    expect(routes.find((entry) => entry.route === '/sw.js')?.headers['Cache-Control']).toBe('no-cache, max-age=0, must-revalidate');
  });

  it('registers every claim once and gives it one tagged browser test', async () => {
    const claims = JSON.parse(await readFile(resolve(root, '.factory/claims.json'), 'utf8')) as Array<{ id: string; test: string; where: string }>;
    const claimTests = await readFile(resolve(root, 'tests/claims.spec.ts'), 'utf8');
    const ids = claims.map((claim) => claim.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const claim of claims) {
      expect(claim.test).toContain(`@claim:${claim.id}`);
      expect(claimTests.split(`@claim:${claim.id}`).length - 1).toBe(1);
    }
    const tags = [...claimTests.matchAll(/@claim:([a-z0-9-]+)/g)].map((match) => match[1]);
    expect(tags.sort()).toEqual([...ids].sort());
    expect(claims.find((claim) => claim.id === 'production-build')?.where).toContain('landing final call-to-action');
  });

  it('keeps the extension skip target and documented size floors in source', async () => {
    const panel = await readFile(resolve(root, 'entrypoints/sidepanel/index.html'), 'utf8');
    const panelCss = await readFile(resolve(root, 'entrypoints/sidepanel/style.css'), 'utf8');
    const siteCss = await readFile(resolve(root, 'site/style.css'), 'utf8');

    expect(panel).toContain('<main id="main" tabindex="-1">');
    expect(panelCss).toContain('.compact { min-height: 44px; padding: 10px 14px; font-size: 14px; }');
    expect(panelCss).toContain('.skip { position: fixed; top: 8px; left: 8px; z-index: 10; display: inline-flex; align-items: center; height: 44px;');
    expect(siteCss).toContain('.brand { display: inline-flex; min-height: 44px;');
    expect(siteCss).toContain('.method-list p { max-width: 690px; margin: 0; color: var(--pencil); font-size: 16px; line-height: 1.6; }');
  });
});
