const CACHE = 'myday-v3';
const ASSETS = [
  'https://gobikasrikanthan.github.io/my-day-app/',
  'https://gobikasrikanthan.github.io/my-day-app/index.html',
  'https://gobikasrikanthan.github.io/my-day-app/manifest.json',
  'https://gobikasrikanthan.github.io/my-day-app/icon-192.png',
  'https://gobikasrikanthan.github.io/my-day-app/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).catch(() =>
        caches.match('https://gobikasrikanthan.github.io/my-day-app/index.html')
      );
    })
  );
});
