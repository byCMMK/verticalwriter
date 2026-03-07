const CACHE = 'cmmk-v1';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll([
      './index.html',
      './manifest.json',
      './icon-192.png',
      './icon-512.png'
    ]))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => { self.clients.claim(); });

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const rc = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, rc));
      return res;
    }))
  );
});
