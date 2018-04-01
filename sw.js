var staticCacheName = 'frogger-static-v2';
var allCaches = [
  staticCacheName
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll([
        '/',
        'css/style.css',
        'js/app.js',
        'js/engine.js',
        'js/resources.js',
        'images/water-block.png',
        'images/stone-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
      ]);
    })
  );//
});

self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.filter(cacheName => {
                return cacheName.startsWith('frogger-') &&
                  !allCaches.includes(cacheName);
            }).map(cacheName => {
                return caches.delete(cacheName);
            })
          );
      })
    );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
  if(event.data.activate == 'true');
    self.skipWaiting();
});