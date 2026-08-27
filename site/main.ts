import { BUY_URL, captureReturnedLicense, LICENSE_KEY, saveLicense, verifyLicense } from '../src/shared/license';

const dialog = document.querySelector<HTMLDialogElement>('#license-dialog');
const form = document.querySelector<HTMLFormElement>('#license-form');
const result = document.querySelector<HTMLElement>('#license-result');
const input = document.querySelector<HTMLInputElement>('#license-input');
const offline = document.querySelector<HTMLElement>('#offline-banner');

document.querySelector('#restore-button')?.addEventListener('click', () => dialog?.showModal());
form?.addEventListener('submit', async (event) => {
  const submitter = (event as SubmitEvent).submitter as HTMLButtonElement | null;
  if (submitter?.value === 'cancel') return;
  event.preventDefault();
  const token = input?.value.trim();
  if (!token || !result) return;
  result.textContent = 'Checking license…';
  saveLicense(token);
  const verdict = await verifyLicense(token, localStorage, true);
  result.textContent = verdict.valid ? '✓ Field Kit license verified. Paste this same key into the extension settings.' : verdict.reason === 'offline' ? 'Could not verify while offline. Try again when connected.' : `This license is ${verdict.reason.replace('_', ' ')}. You can get a new license below.`;
  if (!verdict.valid && verdict.reason !== 'offline') {
    const link = document.createElement('a');
    link.href = BUY_URL;
    link.textContent = ' Get Field Kit';
    result.append(link);
  }
});

const hasReturnedLicense = new URL(location.href).searchParams.has('license');
const returned = captureReturnedLicense();
if (hasReturnedLicense && returned) {
  const notice = document.createElement('div');
  notice.className = 'purchase-notice';
  notice.setAttribute('role', 'status');
  notice.innerHTML = '<strong>Purchase saved in this browser.</strong> Open the extension’s settings and paste the same license key to unlock Field Kit there.';
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.textContent = 'Copy license key';
  copy.addEventListener('click', async () => {
    await navigator.clipboard.writeText(localStorage.getItem(LICENSE_KEY) ?? '');
    copy.textContent = 'Copied';
  });
  notice.append(copy);
  document.body.prepend(notice);
  void verifyLicense(returned);
}

function updateConnectivity(): void {
  if (offline) offline.hidden = navigator.onLine;
}
window.addEventListener('online', updateConnectivity);
window.addEventListener('offline', updateConnectivity);
updateConnectivity();

if ('serviceWorker' in navigator) window.addEventListener('load', () => void navigator.serviceWorker.register('/sw.js'));
