
const BASE_URL = "https://api.football-data.org/v2/";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if(workbox){
  console.log('Workbox has been successed to load');
}else{
  console.log('Workbox hasn\'t been to loading');
}

workbox.precaching.precacheAndRoute([
    {url : "/",revision:'1'},
    {url : "/index.html",revision:'1'},
    {url : "/nav.html",revision:'1'},
    {url : "/main.js",revision:'1'},
    {url : "/manifest.json",revision:'1'},
    {url : "/pages/favorite.html",revision:'1'},
    {url : "/pages/match.html",revision:'1'},
    {url : "/pages/team.html",revision:'1'},
    {url : "/css/materialize.min.css",revision:'1'},
    {url : "/js/materialize.min.js",revision:'1'},
    {url : "/js/nav.js",revision:'1'},
    {url : "/js/db.js",revision:'1'},
    {url : "/js/idb.js",revision:'1'},
    {url : "/js/football-api.js",revision:'1'},
    {url : "/img/champions-league.jpg",revision:'1'},
    {url : "/img/bg.png",revision:'1'},
    {url : "/img/logo.png",revision:'1'}
]);
workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate()
);
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins:[
      new workbox.expiration.Plugin({
        maxEntries: 70,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp(BASE_URL),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "API-CACHE",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30
      })
    ]
  })
)

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'message';
    }
    var options = {
        body: body,
        icon: '/img/logo.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});