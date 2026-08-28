export {};

const offline = document.querySelector<HTMLElement>('#offline-banner');
const announcer = document.querySelector<HTMLElement>('#route-announcer');

if (location.pathname === '/' && new URLSearchParams(location.search).get('demo') === '1') {
  location.replace('/demo/?demo=1');
}

function updateConnectivity(): void {
  if (offline) offline.hidden = navigator.onLine;
}

function focusRouteHeading(): void {
  const heading = document.querySelector<HTMLElement>('h1');
  if (!heading) return;
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
  if (announcer) announcer.textContent = `${heading.textContent?.trim() ?? document.title}. Page loaded.`;
}

window.addEventListener('online', updateConnectivity);
window.addEventListener('offline', updateConnectivity);
window.addEventListener('pageshow', focusRouteHeading);
window.addEventListener('popstate', focusRouteHeading);
updateConnectivity();

if ('serviceWorker' in navigator) window.addEventListener('load', () => void navigator.serviceWorker.register('/sw.js'));
