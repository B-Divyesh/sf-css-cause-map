import { describe, expect, it } from 'vitest';
import { reportAsHtml, reportAsJson, scrubReport } from '../src/shared/export';
import type { AnalysisReport } from '../src/shared/types';

const report: AnalysisReport = {
  schema: 'css-cause-map/v1',
  capturedAt: '2026-08-27T00:00:00.000Z',
  page: { url: 'https://example.test/private?token=secret#account' },
  target: { selector: 'article.customer-name', tag: 'article' },
  box: { x: 10, y: 20, width: 300, height: 180, margin: ['0px', '0px', '0px', '0px'], padding: ['8px', '8px', '8px', '8px'], border: ['0px', '0px', '0px', '0px'] },
  causes: [{ id: 'width-0', property: 'width', value: '300px', score: 96, confidence: 'strong', scope: 'element', origin: 'article.customer-name', distance: 0, reason: 'Computed width.', source: { selector: '.customer-name', location: 'https://example.test/app.css?v=secret', important: false } }],
  ancestors: [{ selector: 'main#account', tag: 'main', distance: 1, display: 'block', position: 'static', width: '900px', height: '600px', overflow: 'visible' }],
  changes: [{ kind: 'attribute', target: 'main#account', detail: 'class changed', at: '2026-08-27T00:00:01.000Z' }],
  caveat: 'Evidence, not proof.'
};

describe('scrubbed exports', () => {
  it('removes URL secrets without mutating the source report', () => {
    const clean = scrubReport(report);
    expect(clean.page.url).toBe('https://example.test/private');
    expect(clean.causes[0]?.source?.location).toBe('https://example.test/app.css');
    expect(report.page.url).toContain('secret');
  });

  it('can anonymize every selector consistently', () => {
    const json = reportAsJson(report, true);
    expect(json).not.toContain('customer-name');
    expect(json).not.toContain('main#account');
    expect(json).toContain('element-1');
  });

  it('escapes report values in standalone HTML', () => {
    const hostile = structuredClone(report);
    hostile.causes[0]!.value = '<script>alert(1)</script>';
    const html = reportAsHtml(hostile);
    expect(html).not.toContain('<script>alert');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('<main>');
  });
});
