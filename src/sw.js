/* eslint-env serviceworker */
/* global workbox */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// Delete the old cache
caches.delete("zws");

if (workbox) {
  console.log("Workbox loaded");

  // Static files
  workbox.routing.registerRoute(
    /\/assets\//,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "static-resources"
    })
  );

  // Pages that are HTML but don't have the `.html` file extension (ex. https://zws.im/stats)
  workbox.routing.registerRoute(
    ({ event }) => event.request.destination === "document",
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "pages"
    })
  );

  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "google-fonts-stylesheets"
    })
  );

  // Cache the underlying font files with a cache-first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: "google-fonts-webfonts",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30
        })
      ]
    })
  );

  // Cache image files
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
    new workbox.strategies.CacheFirst({
      cacheName: "images",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  );

  workbox.routing.setDefaultHandler(
    new workbox.strategies.StaleWhileRevalidate()
  );

  workbox.googleAnalytics.initialize();
} else {
  console.error("Workbox didn't load");
}
