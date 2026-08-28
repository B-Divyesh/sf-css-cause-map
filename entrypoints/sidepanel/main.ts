import { browser } from 'wxt/browser';
import { reportAsHtml, reportAsJson } from '../../src/shared/export';
import type { AnalysisReport, Cause, ExtensionMessage } from '../../src/shared/types';

const byId = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;
const pickButton = byId<HTMLButtonElement>('pick-button');
const cancelButton = byId<HTMLButtonElement>('cancel-button');
const emptyState = byId('empty-state');
const results = byId('results');
const settings = byId('settings');
const notice = byId('notice');
const statusCopy = byId('status-copy');
const clearReportLogButton = byId<HTMLButtonElement>('clear-report-log');
let report: AnalysisReport | null = null;
let clearLogArmed = false;
interface SavedEntry { report: AnalysisReport; note: string; savedAt: string }

browser.runtime.onMessage.addListener((message: ExtensionMessage) => {
  if (message.type === 'CCM_ANALYSIS') showReport(message.report);
  if (message.type === 'CCM_PICKER_STATE') setPickerState(message.state, message.message);
  if (message.type === 'CCM_ERROR') showNotice(message.message, true);
});

pickButton.addEventListener('click', startPicker);
byId('repick-button').addEventListener('click', startPicker);
cancelButton.addEventListener('click', () => void send({ type: 'CCM_CANCEL_PICKER' }));
byId('recapture-button').addEventListener('click', async () => {
  statusCopy.textContent = 'Recapturing the selected element…';
  const response = await send({ type: 'CCM_RECAPTURE' });
  if (!response?.ok) showNotice(response?.error ?? 'Could not recapture this element.', true);
});
byId('export-json').addEventListener('click', () => report && download('css-cause-map-report.json', reportAsJson(report, anonymous()), 'application/json'));
byId('export-html').addEventListener('click', () => report && download('css-cause-map-report.html', reportAsHtml(report, anonymous()), 'text/html'));
byId('save-report').addEventListener('click', saveReport);
byId('settings-button').addEventListener('click', openSettings);
byId('settings-close').addEventListener('click', closeSettings);
clearReportLogButton.addEventListener('click', clearReportLog);

async function startPicker(): Promise<void> {
  setPickerState('picking', 'Hover and click an element. Press Escape to cancel.');
  const response = await send({ type: 'CCM_START_PICKER' });
  if (!response?.ok) {
    setPickerState('ready');
    showNotice(response?.error ?? 'This page cannot be inspected.', true);
  }
}

async function send(message: ExtensionMessage): Promise<{ ok: boolean; error?: string } | undefined> {
  return browser.runtime.sendMessage(message) as Promise<{ ok: boolean; error?: string } | undefined>;
}

function setPickerState(state: 'ready' | 'picking' | 'cancelled', message?: string): void {
  const active = state === 'picking';
  pickButton.classList.toggle('hidden', active);
  cancelButton.classList.toggle('hidden', !active);
  statusCopy.textContent = message ?? (report ? 'Analysis ready. Recapture after reproducing the defect.' : 'Choose one element on this page to begin.');
}

function showReport(next: AnalysisReport): void {
  report = next;
  settings.classList.add('hidden');
  emptyState.classList.add('hidden');
  results.classList.remove('hidden');
  setPickerState('ready');
  byId('target-selector').textContent = next.target.selector;
  byId('measure-width').textContent = `${next.box.width}px`;
  byId('measure-height').textContent = `${next.box.height}px`;
  byId('measure-offset').textContent = `${next.box.x} / ${next.box.y}`;
  const comparison = byId('comparison');
  if (next.comparison) {
    comparison.textContent = `Since previous: width ${signed(next.comparison.widthDelta)}px · height ${signed(next.comparison.heightDelta)}px · x ${signed(next.comparison.xDelta)}px · y ${signed(next.comparison.yDelta)}px`;
    comparison.classList.remove('hidden');
  } else comparison.classList.add('hidden');
  byId('caveat').textContent = next.caveat;
  const list = byId<HTMLOListElement>('cause-list');
  list.replaceChildren(...next.causes.map(causeNode));
  const changes = byId<HTMLUListElement>('change-list');
  changes.replaceChildren(...next.changes.map((change) => {
    const li = document.createElement('li');
    li.innerHTML = `<code></code><span></span>`;
    li.querySelector('code')!.textContent = change.target;
    li.querySelector('span')!.textContent = change.detail;
    return li;
  }));
  byId('change-count').textContent = String(next.changes.length);
  showNotice(`Mapped ${next.causes.length} contributing signals.`, false);
}

function causeNode(cause: Cause, index: number): HTMLLIElement {
  const li = document.createElement('li');
  li.className = 'cause';
  const details = document.createElement('details');
  if (index === 0) details.open = true;
  const summary = document.createElement('summary');
  const rank = document.createElement('span');
  rank.className = 'rank';
  rank.textContent = String(index + 1).padStart(2, '0');
  const key = document.createElement('span');
  key.className = 'cause-key';
  const property = document.createElement('code');
  property.textContent = cause.property;
  const value = document.createElement('strong');
  value.textContent = cause.value;
  key.append(property, value);
  const strength = document.createElement('span');
  strength.className = `strength ${cause.confidence}`;
  strength.textContent = cause.confidence;
  summary.append(rank, key, strength);
  const body = document.createElement('div');
  body.className = 'cause-body';
  const explanation = document.createElement('p');
  explanation.textContent = cause.reason;
  const origin = document.createElement('p');
  origin.className = 'source';
  origin.textContent = cause.source
    ? `${cause.source.selector} · ${cause.source.location}${cause.source.important ? ' · !important' : ''}`
    : `${cause.origin} · computed value`;
  body.append(explanation, origin);
  details.append(summary, body);
  li.append(details);
  return li;
}

function anonymous(): boolean { return byId<HTMLInputElement>('anonymous-check').checked; }

function download(filename: string, body: string, type: string): void {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
  showNotice(`${filename.endsWith('.json') ? 'JSON' : 'HTML'} report exported. No page text was included.`, false);
}

async function saveReport(): Promise<void> {
  if (!report) return;
  const stored = await browser.storage.local.get('ccm_report_log');
  const log = Array.isArray(stored.ccm_report_log) ? stored.ccm_report_log as SavedEntry[] : [];
  log.unshift({ report, note: byId<HTMLTextAreaElement>('report-note').value.trim(), savedAt: new Date().toISOString() });
  await browser.storage.local.set({ ccm_report_log: log.slice(0, 100) });
  showNotice('Saved locally to your report log.', false);
  byId<HTMLTextAreaElement>('report-note').value = '';
  await renderLog();
}

function openSettings(): void {
  emptyState.classList.add('hidden');
  results.classList.add('hidden');
  settings.classList.remove('hidden');
  void renderLog();
}

function closeSettings(): void {
  resetClearLogConfirmation();
  settings.classList.add('hidden');
  (report ? results : emptyState).classList.remove('hidden');
}

async function clearReportLog(): Promise<void> {
  if (!clearLogArmed) {
    clearLogArmed = true;
    clearReportLogButton.textContent = 'Confirm clear report log';
    showNotice('Choose Confirm clear report log to delete every saved report and private note.', true);
    return;
  }
  await browser.storage.local.remove('ccm_report_log');
  resetClearLogConfirmation();
  await renderLog();
  showNotice('Report log cleared. All saved reports and private notes were deleted.', false);
}

function resetClearLogConfirmation(): void {
  clearLogArmed = false;
  clearReportLogButton.textContent = 'Clear report log';
}

function showNotice(message: string, isError: boolean): void {
  notice.textContent = message;
  notice.classList.remove('hidden', 'error');
  notice.classList.toggle('error', isError);
  window.setTimeout(() => notice.classList.add('hidden'), 5000);
}

async function renderLog(): Promise<void> {
  const stored = await browser.storage.local.get('ccm_report_log');
  const entries = Array.isArray(stored.ccm_report_log) ? stored.ccm_report_log as SavedEntry[] : [];
  const list = byId<HTMLUListElement>('field-log-list');
  if (!entries.length) {
    const item = document.createElement('li');
    item.className = 'micro';
    item.textContent = 'No saved reports yet.';
    list.replaceChildren(item);
    clearReportLogButton.disabled = true;
    return;
  }
  clearReportLogButton.disabled = false;
  list.replaceChildren(...entries.map((entry) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    const selector = document.createElement('code');
    selector.textContent = entry.report.target.selector;
    const detail = document.createElement('span');
    detail.textContent = `${new Date(entry.savedAt).toLocaleString()}${entry.note ? ` · ${entry.note}` : ''}`;
    button.append(selector, detail);
    button.addEventListener('click', () => showReport(entry.report));
    item.append(button);
    return item;
  }));
}

function signed(value: number): string { return value > 0 ? `+${value}` : String(value); }
