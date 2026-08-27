import type { AnalysisReport, Cause } from './types';

export function scrubReport(report: AnalysisReport, anonymizeSelectors = false): AnalysisReport {
  const origin = safePageLocation(report.page.url);
  const selectorMap = new Map<string, string>();
  let count = 0;
  const selector = (value: string): string => {
    if (!anonymizeSelectors) return value;
    if (!selectorMap.has(value)) selectorMap.set(value, `element-${++count}`);
    return selectorMap.get(value)!;
  };
  return {
    ...report,
    page: { url: origin },
    target: { ...report.target, selector: selector(report.target.selector) },
    causes: report.causes.map((cause) => ({
      ...cause,
      origin: selector(cause.origin),
      source: cause.source ? { ...cause.source, selector: selector(cause.source.selector), location: safePageLocation(cause.source.location) } : undefined
    })),
    ancestors: report.ancestors.map((ancestor) => ({ ...ancestor, selector: selector(ancestor.selector) })),
    changes: report.changes.map((change) => ({ ...change, target: selector(change.target) }))
  };
}

export function reportAsJson(report: AnalysisReport, anonymizeSelectors = false): string {
  return JSON.stringify(scrubReport(report, anonymizeSelectors), null, 2);
}

export function reportAsHtml(report: AnalysisReport, anonymizeSelectors = false): string {
  const clean = scrubReport(report, anonymizeSelectors);
  const rows = clean.causes.map(causeRow).join('');
  const changes = clean.changes.length
    ? `<h2>Observed DOM changes</h2><ul>${clean.changes.map((change) => `<li><code>${escapeHtml(change.target)}</code> — ${escapeHtml(change.detail)}</li>`).join('')}</ul>`
    : '<h2>Observed DOM changes</h2><p>None observed between captures.</p>';
  const comparison = clean.comparison
    ? `<p class="delta">Since previous capture: width ${signed(clean.comparison.widthDelta)}px · height ${signed(clean.comparison.heightDelta)}px · x ${signed(clean.comparison.xDelta)}px · y ${signed(clean.comparison.yDelta)}px</p>`
    : '';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>CSS Cause Map report</title><style>${reportStyles}</style></head><body><main><p class="eyebrow">CSS CAUSE MAP / SCRUBBED FIELD NOTE</p><h1>${escapeHtml(clean.target.selector)}</h1><p>${escapeHtml(clean.page.url)} · ${escapeHtml(clean.capturedAt)}</p><section class="measure"><b>${clean.box.width} × ${clean.box.height}px</b><span>x ${clean.box.x} / y ${clean.box.y}</span></section>${comparison}<h2>Ranked causes</h2><ol>${rows}</ol>${changes}<aside>${escapeHtml(clean.caveat)}</aside></main></body></html>`;
}

function causeRow(cause: Cause): string {
  const source = cause.source ? `<small>${escapeHtml(cause.source.selector)} · ${escapeHtml(cause.source.location)}</small>` : '<small>computed value</small>';
  return `<li><div><b>${escapeHtml(cause.property)}: ${escapeHtml(cause.value)}</b><span>${cause.score}/99 · ${escapeHtml(cause.confidence)}</span></div><p>${escapeHtml(cause.reason)}</p>${source}</li>`;
}

function safePageLocation(value: string): string {
  if (value === 'inline' || value === 'document stylesheet' || value === 'stylesheet') return value;
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`;
  } catch { return value.replace(/[?#].*$/, ''); }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]!);
}

function signed(value: number): string { return value > 0 ? `+${value}` : String(value); }

const reportStyles = `:root{color-scheme:light;font-family:ui-monospace,monospace;color:#172026;background:#f6f0df}body{margin:0}main{max-width:780px;margin:auto;padding:48px 24px}h1,h2{font-family:Georgia,serif}h1{font-size:36px}h2{margin-top:40px;border-bottom:1px solid #c9bea6;padding-bottom:8px}.eyebrow{color:#174f79;font-weight:700;letter-spacing:.12em}.measure{display:flex;justify-content:space-between;background:#fffdf5;border:1px solid #c9bea6;padding:20px}.delta{color:#315f46;font-weight:700}li{padding:16px 0;border-bottom:1px solid #c9bea6}li div{display:flex;justify-content:space-between;gap:20px}li p{line-height:1.5}small{color:#566067}aside{margin-top:36px;padding:16px;border-left:4px solid #a73a2a;background:#fffdf5}`;
