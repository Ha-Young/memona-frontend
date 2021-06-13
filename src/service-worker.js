/* eslint-disable no-restricted-globals */

import { clientsClaim, setCacheNameDetails } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

import { GqlNetworkFirst } from "./serviceWorker/gqlCaching";

setCacheNameDetails({
  prefix: "memona",
  suffix: "v1",
  precache: "precache",
  runtime: "runtime",
  googleAnalytics: "google-analytics",
});

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
  ({ request, url }) => {
    if (request.mode !== "navigate") {
      return false;
    }

    if (url.pathname.startsWith("/_")) {
      return false;
    }

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

registerRoute(
  ({ request }) => request.destination === "image",
  new StaleWhileRevalidate({
    cacheName: "memona-images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      })
    ],
  })
);

registerRoute(
  ({ request }) =>
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "manifest" ||
    new RegExp("\\.ico$"),
  new StaleWhileRevalidate({
    cacheName: "memona-static-resources",
  })
);

registerRoute(
  ({ url, event }) => url.origin === process.env.REACT_APP_GRAPHQL_API_URI,
  ({ event }) => {
    try {
      return GqlNetworkFirst(event);
    } catch (err) {
      console.log(err);
    }
  },
  "POST"
);

self.addEventListener("fetch", (event) => {
  if (event.request.method === "POST") {
    event.respondWith(GqlNetworkFirst(event));
  }
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
