//constante
const CACHE_NAME="v1_cache_PWA";

var urlsToCache= [
    './',
    './images/dfcuu1.jpg',
    './images/dfcuu2.jpg',
    './images/dfcuu3.jpg',
    './images/dfcuu4.jpg',
    './images/genesis.jpg',
    './images/genesis2.png',
    './images/genesis3.png',
    './images/mujer-16.png',
    './images/mujer-32.png',
    './images/mujer-64.png',
    './images/mujer-96.png',
    './images/mujer-128.png',
    './images/mujer-144.png',
    './images/mujer-192.png',
    './images/mujer-240.png',
    './images/mujer-256.png',
    './images/mujer-384.png',
    './images/mujer-512.png',
    './images/mujer-1024.png',
    './images/mujer.png',
    './images/smarttank.jpg',
    './images/yoshiry.jpg',
    './site.css/styles.css',
];

//Eventos que tiene el SW

//Intalacion del sw y
//guardar los recursos estaticos de la aplicacion

//Evento Install
self.addEventListener('activate', e => {
    e.WaitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                            .then(()=>{
                                self.skipWaiting();
                            });
            })
            .catch(err=>{
                console.log('No se ha cargado la cache', err);
            })
    );   
});

self.addEventListener('activate', e =>{
    //agregamos todos los elementos en la cache
    const cacheWhiteList = [CACHE_NAME];
    e.WaitUntil(
        caches.keys()
            .then(cacheNames =>
            {
                return Promise.all(
                    cacheNames.map(cacheName=>
                    {
                        if(cacheWhiteList.indexOf(cacheName)=== -1){
                            //borrar los elementos que no estan o no se necesitan
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(()=>{
                //Activar cache en el dispositivo
                self.clients.claim();
            })
        );
});

//Evento Fetch (actualiza la aplicacion)

self.addEventListener('fetch',e=>{
    e.respondWith(
        caches.match(e.request)
              .then(res=>{
                    if(res){
                        //devuelvo datos desde cache
                        return res;
                    }
                    return fetch(e.request);
                })
    );
});

