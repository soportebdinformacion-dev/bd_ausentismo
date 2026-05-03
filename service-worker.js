const CACHE_NAME = 'huarmey-ausentismo-v1';

// Archivos necesarios para que la app abra sin internet
const assets = [
  './',
  './index.html',
  './manifest.json',
  './ICONO HUARMEY.png',
  'https://unpkg.com/dexie@3.2.0/dist/dexie.min.js'
];

// Instalación: Guarda los archivos en la memoria del celular
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache de Ausentismo Huarmey guardado correctamente');
      return cache.addAll(assets);
    })
  );
});

// Intercepta las peticiones para servir los archivos desde el caché
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});