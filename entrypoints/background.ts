import { browser } from 'wxt/browser';
import type { ExtensionMessage } from '../src/shared/types';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    void browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  });

  browser.runtime.onMessage.addListener((message: ExtensionMessage, sender) => {
    if (message.type !== 'CCM_START_PICKER' && message.type !== 'CCM_RECAPTURE' && message.type !== 'CCM_CANCEL_PICKER') return;
    return relayToActiveTab(message, sender.tab?.id);
  });
});

async function relayToActiveTab(message: ExtensionMessage, senderTabId?: number): Promise<{ ok: boolean; error?: string }> {
  try {
    const tabId = senderTabId ?? (await browser.tabs.query({ active: true, currentWindow: true }))[0]?.id;
    if (!tabId) throw new Error('No active tab found.');
    const tab = await browser.tabs.get(tabId);
    if (!tab.url || /^(chrome|edge|about|view-source|chrome-extension):/.test(tab.url)) {
      throw new Error('Chrome does not allow page inspection here. Open a regular web page and try again.');
    }
    await browser.scripting.executeScript({ target: { tabId }, files: ['/picker.js'] });
    await browser.tabs.sendMessage(tabId, message);
    return { ok: true };
  } catch (error) {
    const messageText = error instanceof Error ? error.message : 'Could not reach this page.';
    await browser.runtime.sendMessage({ type: 'CCM_ERROR', message: messageText } satisfies ExtensionMessage).catch(() => undefined);
    return { ok: false, error: messageText };
  }
}
