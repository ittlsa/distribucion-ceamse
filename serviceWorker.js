importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js')
importScripts('assets/js/serviceWorkerDb.js');
importScripts('assets/js/serviceWorkerUtil.js');

const URL_API = '/RestServiceImpl.svc/';

self.addEventListener('fetch', e => {
    console.log('Hello service worker');

    let respuesta;

    if (e.request.url.indexOf(URL_API) >= 0) {

        // return respuesta????
        console.log("Entre en include");
        respuesta = manejoApiMensajes(e.request);

    } else {
        console.log("No entre en include");
        respuesta = fetch(e.request);
    }

    e.respondWith(respuesta);
    // stop propagation to Angular Service Worker if we need
    e.stopImmediatePropagation();

});


// tareas asíncronas
self.addEventListener('sync', e => {

    console.log('SW: Sync');

    if (e.tag === 'nuevo-post') {

        // postear a BD cuando hay conexión
        const respuesta = postearMensajes();

        e.waitUntil(respuesta);
    }

});
importScripts('./ngsw-worker.js');