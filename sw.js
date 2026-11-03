const VERSION = "v1";
const ARCHIVOS = [
    "./",
    "./index.html",
    "./styles.css",
    "./app.js",
    "./manifest.json",
    "./icono-192.png",
    "./icono-512.png"
];

self.addEventListener("install", e => {
    e.waitUntil(caches.open(VERSION).then(cache => cache.addAll(ARCHIVOS)));
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== VERSION) return caches.delete(key);
            })
        ))
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});