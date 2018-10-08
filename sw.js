const cacheName = 'v2';

const urlsToCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
  ]
  
console.log('In root => Service Worker: Registered');
self.addEventListener('install', function(event){
    console.log('sw.js => Install event fired: ', addEventListener);
    event.waitUntil(
      caches.open(cacheName).then(function(cache){
        return cache.addAll(urlsToCache);
      })
    );
  });

  self.addEventListener('fetch', function(event){
    console.log("Current event is: ", event);
    event.respondWith(
        caches.match(event.request).then(function(response){
            if (response) {
                console.log(`Found ${event.request.url} in cache.`);
                return response;
            } else {
                console.log(`Did not find ${event.request.url} in cache.  FETCHING`);
                return fetch(event.request)
                .then(function(response) {
                    const clonedResponse = response.clone();
                    caches.open(cacheName).then(function(cache){
                        cache.put(event.request, clonedResponse);
                        console.log(`Added ${event.request.url} to cache ${cacheName}`);
                    })
                    return response;
                })
                .catch(function(err) {
                    console.error(err);
                })
            }
        })
    );
  });
/*
  self.addEventListener('fetch', function(e) {
      e.respondWith(
          caches.match(e.request).then(fuction(response){
              if (response) {
                  console.log('Found', e.request, ' in cache');
                  console.log('Found ' + e.request + ' in cache');
                  return response;
              } else {
                  console.log('Could not find ', e.request, ' in cache, FETCHING');
                  return fetch(e.request);
              }
          })
      );
  })
  */