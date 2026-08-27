import { browser } from 'wxt/browser';
import { analyzeElement, selectorFor } from '../src/analysis/engine';
import type { AnalysisReport, DomChange, ExtensionMessage } from '../src/shared/types';

declare global {
  interface Window { __CCM_PICKER_READY__?: boolean; }
}

export default defineUnlistedScript(() => {
  if (window.__CCM_PICKER_READY__) return;
  window.__CCM_PICKER_READY__ = true;

  let target: Element | null = null;
  let overlay: HTMLDivElement | null = null;
  let label: HTMLDivElement | null = null;
  let picking = false;
  let keyboardIndex = -1;
  let previousReport: AnalysisReport | null = null;
  const changes: DomChange[] = [];
  const observer = new MutationObserver((records) => {
    if (!target) return;
    for (const record of records) {
      if (!(record.target instanceof Element) && !(record.target.parentElement instanceof Element)) continue;
      const changed = record.target instanceof Element ? record.target : record.target.parentElement!;
      changes.push({
        kind: record.type === 'attributes' ? 'attribute' : 'child-list',
        target: selectorFor(changed),
        detail: record.type === 'attributes' ? `${record.attributeName ?? 'attribute'} changed` : 'children added or removed',
        at: new Date().toISOString()
      });
      if (changes.length > 60) changes.shift();
    }
  });

  browser.runtime.onMessage.addListener((message: ExtensionMessage) => {
    if (message.type === 'CCM_START_PICKER') start();
    if (message.type === 'CCM_CANCEL_PICKER') stop('cancelled');
    if (message.type === 'CCM_RECAPTURE') recapture();
  });

  function start(): void {
    if (picking) return;
    picking = true;
    ensureOverlay();
    document.addEventListener('pointermove', onMove, true);
    document.addEventListener('click', onPick, true);
    document.addEventListener('keydown', onKey, true);
    document.documentElement.style.cursor = 'crosshair';
    void send({ type: 'CCM_PICKER_STATE', state: 'picking', message: 'Hover and click an element. Escape cancels; Tab and Enter work too.' });
  }

  function onMove(event: PointerEvent): void {
    const element = document.elementFromPoint(event.clientX, event.clientY);
    if (element && !isOverlay(element)) highlight(element);
  }

  function onPick(event: MouseEvent): void {
    const element = document.elementFromPoint(event.clientX, event.clientY);
    if (!element || isOverlay(element)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    select(element);
  }

  function onKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      stop('cancelled');
      return;
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      const choices = Array.from(document.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter((item) => !isOverlay(item));
      if (!choices.length) return;
      keyboardIndex = (keyboardIndex + (event.shiftKey ? -1 : 1) + choices.length) % choices.length;
      const choice = choices[keyboardIndex];
      if (choice) highlight(choice);
    }
    if (event.key === 'Enter' && keyboardIndex >= 0) {
      const choices = Array.from(document.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter((item) => !isOverlay(item));
      const choice = choices[keyboardIndex];
      if (choice) {
        event.preventDefault();
        select(choice);
      }
    }
  }

  function select(element: Element): void {
    target = element;
    changes.length = 0;
    observer.disconnect();
    stop('ready');
    observer.observe(document.documentElement, { subtree: true, attributes: true, childList: true });
    previousReport = analyzeElement(element);
    void send({ type: 'CCM_ANALYSIS', report: previousReport });
  }

  function recapture(): void {
    if (!target || !target.isConnected) {
      void send({ type: 'CCM_ERROR', message: 'The selected element is no longer in the page. Pick it again.' });
      return;
    }
    const next = analyzeElement(target, changes);
    if (previousReport) {
      next.comparison = {
        previousCapturedAt: previousReport.capturedAt,
        widthDelta: roundDelta(next.box.width - previousReport.box.width),
        heightDelta: roundDelta(next.box.height - previousReport.box.height),
        xDelta: roundDelta(next.box.x - previousReport.box.x),
        yDelta: roundDelta(next.box.y - previousReport.box.y)
      };
    }
    previousReport = next;
    void send({ type: 'CCM_ANALYSIS', report: next });
    changes.length = 0;
  }

  function stop(state: 'ready' | 'cancelled'): void {
    picking = false;
    document.removeEventListener('pointermove', onMove, true);
    document.removeEventListener('click', onPick, true);
    document.removeEventListener('keydown', onKey, true);
    document.documentElement.style.cursor = '';
    overlay?.remove();
    label?.remove();
    overlay = null;
    label = null;
    void send({ type: 'CCM_PICKER_STATE', state });
  }

  function ensureOverlay(): void {
    overlay = document.createElement('div');
    overlay.dataset.ccmOverlay = 'true';
    Object.assign(overlay.style, { position: 'fixed', zIndex: '2147483646', pointerEvents: 'none', border: '2px solid #174f79', background: 'rgba(23,79,121,.10)', boxShadow: '0 0 0 1px #fffdf5', left: '0', top: '0' });
    label = document.createElement('div');
    label.dataset.ccmOverlay = 'true';
    Object.assign(label.style, { position: 'fixed', zIndex: '2147483647', pointerEvents: 'none', color: '#fffdf5', background: '#0d3858', padding: '5px 8px', font: '600 12px ui-monospace, monospace', borderRadius: '2px', maxWidth: '70vw' });
    document.documentElement.append(overlay, label);
  }

  function highlight(element: Element): void {
    if (!overlay || !label) ensureOverlay();
    const rect = element.getBoundingClientRect();
    Object.assign(overlay!.style, { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
    label!.textContent = `${selectorFor(element)} · ${Math.round(rect.width)}×${Math.round(rect.height)}`;
    const labelTop = rect.top > 32 ? rect.top - 30 : rect.bottom + 4;
    Object.assign(label!.style, { left: `${Math.max(4, rect.left)}px`, top: `${Math.max(4, labelTop)}px` });
  }

  function isOverlay(element: Element): boolean { return Boolean(element.closest('[data-ccm-overlay]')); }
  async function send(message: ExtensionMessage): Promise<void> { await browser.runtime.sendMessage(message).catch(() => undefined); }
  function roundDelta(value: number): number { return Math.round(value * 10) / 10; }
});
