/**
 * Created by Yan on 17/9/19.
 */
var cacheStorageKey = 'minimal-pwa-1'

var cacheList = [
  '/',
  "index.html",
  // "main.css",
  "e.png"
]

self.addEventListener('install', e => {
  console.log('install');
  e.waitUntil(
    caches.open(cacheStorageKey)
      .then(cache => cache.addAll(cacheList))
      .then(() => self.skipWaiting())
  )
});

self.addEventListener('fetch', function(e) {
  console.log('fetch');
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response != null) {
        return response
      }
      return fetch(e.request.url)
    })
  )
})

self.addEventListener('activate', function(e) {
  console.log('activate');
  e.waitUntil(
    Promise.all(
      caches.keys().then(cacheNames => {
        return cacheNames.map(name => {
          if (name !== cacheStorageKey) {
            return caches.delete(name)
          }
        })
      })
    ).then(() => {
      return self.clients.claim()
    })
  )
})