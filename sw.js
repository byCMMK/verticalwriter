const CACHE = 'cmmk-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // 모든 캐시 삭제
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // 캐시 없이 항상 네트워크에서 직접 받아옴
  e.respondWith(fetch(e.request));
});
