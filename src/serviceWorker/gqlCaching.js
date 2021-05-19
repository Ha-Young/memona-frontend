import MD5 from "crypto-js/md5";
import { createStore, get, set } from "idb-keyval";
import { BackgroundSyncPlugin } from "workbox-background-sync";

const gqlStore = createStore("GraphQL-Cache", "PostResponses");

export async function GqlStaleWhileRevalidate(event) {
  const cachedResponse = await getCache(event.request.clone());

  const fetchPromise = fetch(event.request.clone())
    .then((response) => {
      setCache(event.request.clone(), response.clone());
      return response;
    })
    .catch((err) => {
      console.error(err);
    });

  return cachedResponse ? Promise.resolve(cachedResponse) : fetchPromise;
}

async function serializeResponse(response) {
  const serializedHeaders = {};
  for (let entry of response.headers.entries()) {
    serializedHeaders[entry[0]] = entry[1];
  }
  const serialized = {
    headers: serializedHeaders,
    status: response.status,
    statusText: response.statusText,
  };
  serialized.body = await response.json();
  return serialized;
}

async function setCache(request, response) {
  const body = await request.json();
  const id = MD5(body.query).toString();

  const entry = {
    query: body.query,
    response: await serializeResponse(response),
    timestamp: Date.now(),
  };

  set(id, entry, gqlStore);
}

async function getCache(request) {
  try {
    const body = await request.json();
    const id = MD5(body.query).toString();
    const data = await get(id, gqlStore);
    if (!data) return null;

    // Check cache max age.
    const cacheControl = request.headers.get("Cache-Control");
    const maxAge = cacheControl ? parseInt(cacheControl.split("=")[1]) : 3600;
    if (Date.now() - data.timestamp > maxAge * 1000) {
      return null;
    }

    return new Response(JSON.stringify(data.response.body), data.response);
  } catch (err) {
    return null;
  }
}
