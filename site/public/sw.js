const CACHE = 'css-cause-map-v2';
const SHELL = ['/', '/demo/?demo=1', '/privacy/', '/terms/', '/404/', '/media/hero-lab-640.webp', '/icon.svg', '/apple-touch-icon.png'];
self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL))));
self.addEventListener('activate', (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))));
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const copy = response.clone();
    if (new URL(event.request.url).origin === location.origin) caches.open(CACHE).then((cache) => cache.put(event.request, copy));
    return response;
  })));
});
