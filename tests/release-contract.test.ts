import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '..');

async function jsonFile(path: string): Promise<Record<string, unknown>> {
  return JSON.parse(await readFile(resolve(root, path), 'utf8')) as Record<string, unknown>;
}

describe('release regression contracts', () => {
  it('prepares WXT types before both clean local quality gates', async () => {
    const packageJson = await jsonFile('package.json');
    const scripts = packageJson.scripts as Record<string, string>;

    expect(scripts['prepare:wxt']).toBe('wxt prepare');
    expect(scripts.pretypecheck).toContain('prepare:wxt');
    expect(scripts.pretest).toContain('prepare:wxt');
  });

  it('ships static-site response policies with immutable asset caching', async () => {
    const config = await jsonFile('site/public/staticwebapp.config.json');
    const headers = config.globalHeaders as Record<string, string>;
    const routes = config.routes as Array<{ route: string; headers: Record<string, string> }>;

    expect(headers['Content-Security-Policy']).toContain("default-src 'self'");
    expect(headers['Content-Security-Policy']).toContain('https://api.sociobot.in');
    expect(headers['X-Frame-Options']).toBe('DENY');
    expect(headers['Permissions-Policy']).toContain('camera=()');
    expect(headers['Cache-Control']).toContain('max-age=300');
    for (const route of ['/assets/*', '/media/*', '/downloads/*']) {
      expect(routes.find((entry) => entry.route === route)?.headers['Cache-Control']).toBe('public, max-age=31536000, immutable');
    }
    expect(routes.find((entry) => entry.route === '/sw.js')?.headers['Cache-Control']).toBe('no-cache, max-age=0, must-revalidate');
  });
});
