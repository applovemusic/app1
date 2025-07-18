const CACHE_NAME = 'app1-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './index.css',
  './app.js',
  './script-sw.js',
  './fonts/roboto-regular.ttf',
  './icons/icon192.png',
  './icons/icon512.png',
  './controls/play.svg',
  './controls/pause.svg',
  './controls/next.svg',
  './controls/prev.svg'
];

// Instala e pré-cacheia os arquivos essenciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativa e limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Intercepta as requisições
self.addEventListener('fetch', event => {
  const request = event.request;

  // Apenas GETs e mesmo domínio
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(request).then(response => {
      return (
        response ||
        fetch(request).then(fetchResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          });
        }).catch(() => {
          // Offline fallback opcional aqui
        })
      );
    })
  );
});
