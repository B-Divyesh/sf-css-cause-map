export {};

const DEMO_KEY = 'demo:css-cause-map:state';
const INITIAL_STATE = { capturedAgain: false, revision: 1 } as const;
const offline = document.querySelector<HTMLElement>('#offline-banner');
const announcer = document.querySelector<HTMLElement>('#route-announcer');
const width = document.querySelector<HTMLElement>('#demo-width');
const comparison = document.querySelector<HTMLElement>('#comparison');
const changes = document.querySelector<HTMLElement>('#changes-copy');
const exportStatus = document.querySelector<HTMLElement>('#export-status');

interface DemoState { capturedAgain: boolean; revision: number }

function readState(): DemoState {
  try {
    const stored = localStorage.getItem(DEMO_KEY);
    return stored ? JSON.parse(stored) as DemoState : { ...INITIAL_STATE };
  } catch {
    return { ...INITIAL_STATE };
  }
}

function writeState(state: DemoState): void {
  localStorage.setItem(DEMO_KEY, JSON.stringify(state));
  render(state);
}

function render(state: DemoState): void {
  if (!width || !comparison || !changes) return;
  width.textContent = state.capturedAgain ? '288 px' : '312 px';
  comparison.hidden = !state.capturedAgain;
  comparison.textContent = state.capturedAgain ? 'Since previous capture: width −24 px · height 0 px · x 0 px · y 0 px' : '';
  changes.textContent = state.capturedAgain
    ? '1 page change: class changed on section.results from three-column to narrow-preview.'
    : 'No changes yet. Choose “Capture again” to load the sample after-state.';
}

function reportBody(anonymize: boolean): Record<string, unknown> {
  const state = readState();
  const target = anonymize ? 'element-1' : 'article.product-card';
  const parent = anonymize ? 'element-2' : 'section.results';
  return {
    schema: 'css-cause-map/v1',
    sample: true,
    page: { url: 'https://shop.example.test/products/summer' },
    target: { selector: target, tag: 'article' },
    box: { x: 48, y: 136, width: state.capturedAgain ? 288 : 312, height: 184 },
    causes: [
      { rank: 1, property: 'grid-template-columns', value: 'repeat(3, 1fr)', origin: parent, reason: 'The parent creates three tracks that constrain this card.', ruleToTest: 'Change grid-template-columns to two tracks.' },
      { rank: 2, property: 'gap', value: '24px', origin: parent, reason: 'The parent inserts 24 px between grid tracks.', ruleToTest: 'Reduce gap and compare the card width.' },
      { rank: 3, property: 'max-width', value: '72rem', origin: anonymize ? 'element-3' : 'main.catalog', reason: 'The page container limits the grid’s available width.', ruleToTest: 'Remove max-width in DevTools.' }
    ],
    parents: [{ selector: parent, display: 'grid', width: 984 }, { selector: anonymize ? 'element-3' : 'main.catalog', display: 'block', width: 1152 }],
    comparison: state.capturedAgain ? { widthDelta: -24, heightDelta: 0, xDelta: 0, yDelta: 0 } : null,
    changes: state.capturedAgain ? [{ target: parent, detail: 'class changed from three-column to narrow-preview' }] : [],
    caveat: 'Visible CSS evidence, not Chrome internal layout decisions.'
  };
}

function download(kind: 'json' | 'html'): void {
  const anonymize = (document.querySelector<HTMLInputElement>('#anonymous-selectors'))?.checked ?? false;
  const report = reportBody(anonymize);
  const json = JSON.stringify(report, null, 2);
  const body = kind === 'json' ? json : `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>CSS Cause Map sample report</title></head><body><main><h1>CSS Cause Map sample report</h1><pre>${escapeHtml(json)}</pre></main></body></html>`;
  const url = URL.createObjectURL(new Blob([body], { type: kind === 'json' ? 'application/json' : 'text/html' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `css-cause-map-sample.${kind}`;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
  if (exportStatus) exportStatus.textContent = `${kind.toUpperCase()} report exported. Page text and URL query details were removed.`;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[character]!);
}

document.querySelector('#capture-again')?.addEventListener('click', () => writeState({ capturedAgain: true, revision: 2 }));
document.querySelector('#reset-demo')?.addEventListener('click', () => {
  writeState({ ...INITIAL_STATE });
  document.querySelector<HTMLElement>('#demo-title')?.focus();
});
document.querySelector('#leave-demo')?.addEventListener('click', () => localStorage.removeItem(DEMO_KEY));
document.querySelector('#export-json')?.addEventListener('click', () => download('json'));
document.querySelector('#export-html')?.addEventListener('click', () => download('html'));

function updateConnectivity(): void { if (offline) offline.hidden = navigator.onLine; }
function focusRouteHeading(): void {
  const heading = document.querySelector<HTMLElement>('h1');
  if (!heading) return;
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
  if (announcer) announcer.textContent = `${heading.textContent?.trim() ?? document.title}. Page loaded.`;
}

if (!localStorage.getItem(DEMO_KEY)) writeState({ ...INITIAL_STATE });
else render(readState());
window.addEventListener('online', updateConnectivity);
window.addEventListener('offline', updateConnectivity);
window.addEventListener('pageshow', focusRouteHeading);
window.addEventListener('popstate', focusRouteHeading);
updateConnectivity();
if ('serviceWorker' in navigator) window.addEventListener('load', () => void navigator.serviceWorker.register('/sw.js'));
