const CACHE_NAME = 'invlab-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/agriculture-saas.html',
  '/sante-saas.html',
  '/commerce-saas.html',
  '/education-saas.html',
  '/politique-saas.html',
  '/logistique-saas.html',
  '/logo.jpg',
  '/accueil.jpeg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});