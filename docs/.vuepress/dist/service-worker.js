/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "a562a92fefbff0b010dd9cebcd1b7be9"
  },
  {
    "url": "assets/css/0.styles.e1af0429.css",
    "revision": "ba73d8adcad4321a017ec05f9de0aefb"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.aef22066.js",
    "revision": "0a9e538fb0ce1918415ac835650725d5"
  },
  {
    "url": "assets/js/11.0a7a05e4.js",
    "revision": "b69eca4977c7f74d1cc65607f13f6874"
  },
  {
    "url": "assets/js/12.89f456ae.js",
    "revision": "d2cf66555338c6550472427359dbac35"
  },
  {
    "url": "assets/js/13.75be57bf.js",
    "revision": "c0693f50a40a8dc37a7bd0c3fcbe33c0"
  },
  {
    "url": "assets/js/14.459d8350.js",
    "revision": "d77b0b37ca3b528563b9a8bfcb098707"
  },
  {
    "url": "assets/js/15.19495658.js",
    "revision": "c8f13c5d540b9f71d657e6f48c5e8407"
  },
  {
    "url": "assets/js/16.ad0002c6.js",
    "revision": "35fc21a95c2c4578eed258824f883199"
  },
  {
    "url": "assets/js/17.bd17046a.js",
    "revision": "ddb38f52b86e582eaeb4a17c30898735"
  },
  {
    "url": "assets/js/18.25c4a01f.js",
    "revision": "6c5e0c4d52f876b3a0b21131bee36e4e"
  },
  {
    "url": "assets/js/19.fb444296.js",
    "revision": "83046c7a1a1e39b8f88f240878b5d7f5"
  },
  {
    "url": "assets/js/2.d9a24b2f.js",
    "revision": "f8ad1fe47b0b39143207a24ac6762a43"
  },
  {
    "url": "assets/js/20.241ab8dc.js",
    "revision": "89f9879416b611aa8ecf08a20947f6f6"
  },
  {
    "url": "assets/js/21.bf8ac9b5.js",
    "revision": "80f26cdf84b5ac0230610cb83a792c4e"
  },
  {
    "url": "assets/js/22.ad6d6671.js",
    "revision": "19249dbf9331795a9ac45f4ac9eae3ac"
  },
  {
    "url": "assets/js/23.5b62f3f9.js",
    "revision": "ee03035446321cae058dca54b27cfb15"
  },
  {
    "url": "assets/js/24.0005338c.js",
    "revision": "3a75ea4c5e07c11375995c0da5d6ac47"
  },
  {
    "url": "assets/js/25.d193b9b9.js",
    "revision": "2511b0226ab6a6aad0066e732d6c1bde"
  },
  {
    "url": "assets/js/26.2171ffe3.js",
    "revision": "48c96dcd3c7371ebc2cc213a920c6ad9"
  },
  {
    "url": "assets/js/27.22961f00.js",
    "revision": "9cca033628263361c3f5112d940962dd"
  },
  {
    "url": "assets/js/28.c10ed1e4.js",
    "revision": "a905ffc59dde94a6d283cf33859b1bf1"
  },
  {
    "url": "assets/js/29.44af775e.js",
    "revision": "99df114c0911dc353b33c58e1e8ec5fe"
  },
  {
    "url": "assets/js/3.4e958bf2.js",
    "revision": "532cb0a89d9dd1c06b8d1fe23f14bd2c"
  },
  {
    "url": "assets/js/30.f2adbdf8.js",
    "revision": "0842d60b8f956ef9ac4405f069b4d38b"
  },
  {
    "url": "assets/js/31.2fd0dc93.js",
    "revision": "2126666b079686313fdb432cee022461"
  },
  {
    "url": "assets/js/32.4a64d9e3.js",
    "revision": "61da16d6e6f2bc94e0c7b743476ccd52"
  },
  {
    "url": "assets/js/33.223d1807.js",
    "revision": "7d7bd5b1cf837b1fa2c4cfe014a2b243"
  },
  {
    "url": "assets/js/34.e8cea680.js",
    "revision": "9beccabf64f48b3cc49dd0f8a3d8fbab"
  },
  {
    "url": "assets/js/35.347a5bb6.js",
    "revision": "6bb599deeceebdc86a76fcfd55e6961b"
  },
  {
    "url": "assets/js/36.6dd38c26.js",
    "revision": "5240a9851ddb31bbcb0c5e8ca3f4a34e"
  },
  {
    "url": "assets/js/4.37a71ad5.js",
    "revision": "af85fef24a36bdee5b79af09c7fb4e26"
  },
  {
    "url": "assets/js/5.357cbb0d.js",
    "revision": "d9d4db9f6f2b13731871189e52d408f1"
  },
  {
    "url": "assets/js/6.caac1194.js",
    "revision": "bb2a9332e273e8b4b84754fbbecb6ebf"
  },
  {
    "url": "assets/js/7.90ca9d22.js",
    "revision": "9482c25771f5db4d885ba8118c9c1c2a"
  },
  {
    "url": "assets/js/8.1ffc6538.js",
    "revision": "6263ec94ab8b66741d0eb9cca7ea2a9d"
  },
  {
    "url": "assets/js/9.88dedcca.js",
    "revision": "42c0f9fedabe7103f644b80fb1c5bbf6"
  },
  {
    "url": "assets/js/app.30c10bcb.js",
    "revision": "9a019a640c9378cb8212b14eebe48b39"
  },
  {
    "url": "avatar.png",
    "revision": "c29f50bfa92e53ae25b3a2b29f9603ea"
  },
  {
    "url": "Git_DevTools/Git.html",
    "revision": "4024309e9b7ab7134db4333242d7af51"
  },
  {
    "url": "Git_DevTools/index.html",
    "revision": "94e61c06f99073aaa5fbb006e7482827"
  },
  {
    "url": "icons/icon-128x128.png",
    "revision": "f99fc75019c7b852e06e3b45d6dfb4e5"
  },
  {
    "url": "icons/icon-144x144.png",
    "revision": "bd95f08870db8df4e1dd282eef18b2ce"
  },
  {
    "url": "icons/icon-152x152.png",
    "revision": "23e12072af8c716c1abebdb40ca2917e"
  },
  {
    "url": "icons/icon-192x192.png",
    "revision": "f54751b56a44fc74cc6cc1028255f648"
  },
  {
    "url": "icons/icon-384x384.png",
    "revision": "4cc540dd23448c208d3cf65f32ca1734"
  },
  {
    "url": "icons/icon-512x512.png",
    "revision": "3344c2b9faee7bccf8735849fe2802f0"
  },
  {
    "url": "icons/icon-72x72.png",
    "revision": "1c56c391430cd97170425775e4ba1d3e"
  },
  {
    "url": "icons/icon-96x96.png",
    "revision": "709292bef9c11461c9e2c0747cdd8299"
  },
  {
    "url": "index.html",
    "revision": "cf0360cd0a9bd0f65029e9d718bdd91e"
  },
  {
    "url": "JavaScript_FrontEnd/index.html",
    "revision": "8e08c0d019ab3e68907eeec75b707b01"
  },
  {
    "url": "JavaScript_FrontEnd/JavaScript.html",
    "revision": "0e868c50bc7dbb3f2527a5b518068f84"
  },
  {
    "url": "JavaScript_FrontEnd/YDNKJS.html",
    "revision": "1ab54dd54401efcc4a747243f054a36b"
  },
  {
    "url": "JavaScript_FrontEnd/你不知道的JS.html",
    "revision": "7a2b6acf30526a772141378cd6a2e267"
  },
  {
    "url": "Jenkins_DevTools/index.html",
    "revision": "48d0df4ff69c92f6170a0f569c09b1d1"
  },
  {
    "url": "Jenkins_DevTools/Jenkins.html",
    "revision": "fe3f18fcbac7ed5a04f6e61f8ee1d65a"
  },
  {
    "url": "Koa_BackEnd/index.html",
    "revision": "426fca64ee44a8278de0865a4e2004c1"
  },
  {
    "url": "Koa_BackEnd/Koa.html",
    "revision": "874802a4aab57f55d8c670c05d5fad12"
  },
  {
    "url": "Linux_System/index.html",
    "revision": "bcffdef416961bef3f1d9e8d67a9b571"
  },
  {
    "url": "Linux_System/Linux.html",
    "revision": "53ce7a59f43139c15eb5851ef42b0ccd"
  },
  {
    "url": "logo.png",
    "revision": "e976f39ca44ca014dfe6cd2a219a9f3a"
  },
  {
    "url": "MySQL_BackEnd/index.html",
    "revision": "9f2e0efeccdbfae635e34809b43b9311"
  },
  {
    "url": "MySQL_BackEnd/MySQL.html",
    "revision": "2f32665abd7bab82080370a436686d87"
  },
  {
    "url": "Nginx_BackEnd/index.html",
    "revision": "89f6a1b3a4bc49cb6cf08847e2dd4511"
  },
  {
    "url": "Nginx_BackEnd/Nginx.html",
    "revision": "f58be90009f26f990c8fe1614960e03c"
  },
  {
    "url": "NodeJS_BackEnd/index.html",
    "revision": "fc2fbf7c918509e335def711adc45b19"
  },
  {
    "url": "NodeJS_BackEnd/NodeJS.html",
    "revision": "7e861b18965817f8a7ba207e6e1bc405"
  },
  {
    "url": "React_FrontEnd/index.html",
    "revision": "f5f29bc00b69b949cee21497ac8f456f"
  },
  {
    "url": "React_FrontEnd/React.html",
    "revision": "ff51ae4578d8fa44644bbf1ec995fbfc"
  },
  {
    "url": "React_FrontEnd/Redux.html",
    "revision": "d9b4b7c71712f5a322c6522ed71bff3b"
  },
  {
    "url": "TypeScript_FrontEnd/index.html",
    "revision": "38bf93ac34668539002dc77970fadbb9"
  },
  {
    "url": "TypeScript_FrontEnd/TypeScript.html",
    "revision": "cde1eba2f06738f28d9b3ff71f8dec93"
  },
  {
    "url": "Vue_FrontEnd/index.html",
    "revision": "1fcf1bbd4398bfacbcc23325e37537d6"
  },
  {
    "url": "Vue_FrontEnd/Vue.html",
    "revision": "b0f2ec78eaad8b8519df5420034f940d"
  },
  {
    "url": "Vue_FrontEnd/Vuex.html",
    "revision": "35a177b939688be93d8854da0e603ae5"
  },
  {
    "url": "Webpack_DevTools/index.html",
    "revision": "c182dcc6622f304fbb37b7759b6b6a60"
  },
  {
    "url": "Webpack_DevTools/Webpack.html",
    "revision": "7b8eb267886fc6d880e589839c4d473a"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
