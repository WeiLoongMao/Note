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
    "revision": "2d3d5d6128428dfc1818429b2e16523c"
  },
  {
    "url": "assets/css/0.styles.ff9ba36c.css",
    "revision": "29836209c3abca9120b5c66b04e1ba70"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.2622995d.js",
    "revision": "dc0000f0094600447471fd005a20a750"
  },
  {
    "url": "assets/js/11.9f956728.js",
    "revision": "0c926ab6b51ff823cc7bef66221c4abd"
  },
  {
    "url": "assets/js/12.1cb194a0.js",
    "revision": "6a7b41a7a12ae266a8d6cbd572235c98"
  },
  {
    "url": "assets/js/13.928d70c1.js",
    "revision": "f863a4900f24d2e66c1fa4080740397a"
  },
  {
    "url": "assets/js/14.8a455de1.js",
    "revision": "9a24f5f6e569ff57155f9a1dfdb6ca82"
  },
  {
    "url": "assets/js/15.585e7a9a.js",
    "revision": "7d24f72f52a03ef8050fd2b2b133e291"
  },
  {
    "url": "assets/js/16.0be4655f.js",
    "revision": "a4341a7e2743f7fd2265c0cf2b281acc"
  },
  {
    "url": "assets/js/17.0a38b819.js",
    "revision": "735ced1628261eb8e3d14f300a7d5a13"
  },
  {
    "url": "assets/js/18.fc9e43b4.js",
    "revision": "8947da15c4acc8bc11b460bf81b00feb"
  },
  {
    "url": "assets/js/19.b8e384b2.js",
    "revision": "ec17de13315253d66f9a8ca3cba89177"
  },
  {
    "url": "assets/js/2.7a960a6a.js",
    "revision": "1a5af7a602748609c0f16c75d70a88bc"
  },
  {
    "url": "assets/js/20.2c831812.js",
    "revision": "d97c2dfa1d8dbe68e8970421f4ee7cf4"
  },
  {
    "url": "assets/js/21.a5321a89.js",
    "revision": "4cfc603c1b9f0b9502b2dd705b56a561"
  },
  {
    "url": "assets/js/22.b65d4093.js",
    "revision": "0c77feafd0fc849dd8639679c3ff641e"
  },
  {
    "url": "assets/js/23.d262cf87.js",
    "revision": "351cf3e7774d7efb00c8c2c551006c61"
  },
  {
    "url": "assets/js/24.cac54fd7.js",
    "revision": "b491358940682c15182f5bf8eff2043a"
  },
  {
    "url": "assets/js/25.b0a8251d.js",
    "revision": "b64fcfa6411c4a6f8ed161248b1ef27a"
  },
  {
    "url": "assets/js/26.36797c5e.js",
    "revision": "dbaf02f4e68eff9a0bffca9fa281a624"
  },
  {
    "url": "assets/js/27.077dde45.js",
    "revision": "576c0ef4ffe05880345fc0cc3af42a38"
  },
  {
    "url": "assets/js/28.0cec50b9.js",
    "revision": "7af1e46a755ddd4ed1a28aaca5b29643"
  },
  {
    "url": "assets/js/29.91e862b6.js",
    "revision": "bc5315347895dae53c22f52ca9da009e"
  },
  {
    "url": "assets/js/3.ededa1a2.js",
    "revision": "ac4a0315606cf6cca795ea8dacaba465"
  },
  {
    "url": "assets/js/30.024d811c.js",
    "revision": "f279e4d88998a9707f242763d0fb3bd0"
  },
  {
    "url": "assets/js/31.d25ca2c6.js",
    "revision": "0db210bf777ee9c9d8f4437039bd8bee"
  },
  {
    "url": "assets/js/32.011c4e75.js",
    "revision": "91eecd1edc9db5a4893a6931d7871d35"
  },
  {
    "url": "assets/js/33.614570f2.js",
    "revision": "ac1884c4d96b6755288f3fea564878fb"
  },
  {
    "url": "assets/js/34.c9897c33.js",
    "revision": "e19d529439ce183342d684c6b39d2da1"
  },
  {
    "url": "assets/js/35.4ed26875.js",
    "revision": "66aaa837313259e060c5b7a0f15a515e"
  },
  {
    "url": "assets/js/36.927bc12a.js",
    "revision": "f26a95eeb47e16a2c6b6b2e44d2b29c5"
  },
  {
    "url": "assets/js/37.c29adea3.js",
    "revision": "51286fdd17380ed578eb6df5efc2daac"
  },
  {
    "url": "assets/js/38.78518438.js",
    "revision": "f785d5c4760648f6d6c82ed9821eef10"
  },
  {
    "url": "assets/js/4.b4907637.js",
    "revision": "dd97029a70c07b1409e312177de3515a"
  },
  {
    "url": "assets/js/5.ff2c26d6.js",
    "revision": "f317537793fed0500e7e342508c1c0d2"
  },
  {
    "url": "assets/js/6.c5848a03.js",
    "revision": "27b3a095e3126feacb846321b18106de"
  },
  {
    "url": "assets/js/7.f76b479f.js",
    "revision": "4bffdd3933a8ecdff32c845684786b75"
  },
  {
    "url": "assets/js/8.cd7b7e77.js",
    "revision": "4e06d1237d630774014800235b59db18"
  },
  {
    "url": "assets/js/9.0783b7e1.js",
    "revision": "f36ab3a13304c29eadb14cc54bea5d67"
  },
  {
    "url": "assets/js/app.492a4f88.js",
    "revision": "398fb4cff7e8b5b09ae53e784cd6e877"
  },
  {
    "url": "avatar.png",
    "revision": "c29f50bfa92e53ae25b3a2b29f9603ea"
  },
  {
    "url": "ES6标准入门/ES6.html",
    "revision": "523065f2f1a9d9eda901abd2a746fa17"
  },
  {
    "url": "Git_DevTools/Git.html",
    "revision": "eb0fb020f414b70d97b393463f4b158d"
  },
  {
    "url": "Git_DevTools/index.html",
    "revision": "1388a2dbff115a7d33ff651806acb93a"
  },
  {
    "url": "Git/Git.html",
    "revision": "4c21e1f964d2b42b9c387b73c382ce99"
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
    "revision": "d042cfe34dfdadc60f8b515d4c718d4e"
  },
  {
    "url": "JavaScript_FrontEnd/ES6.html",
    "revision": "1219f92090c61e4986979565efafb00f"
  },
  {
    "url": "JavaScript_FrontEnd/index.html",
    "revision": "ab5e5fb318c7761c9ff82cf4586b7936"
  },
  {
    "url": "JavaScript_FrontEnd/JavaScript语言精粹.html",
    "revision": "0f4f58f04018a50810ea67f731a364f4"
  },
  {
    "url": "JavaScript_FrontEnd/YDNKJS.html",
    "revision": "c1abcd9e9656cdcc64a2b4c8df3a493d"
  },
  {
    "url": "JavaScript语言精粹/JavaScript语言精粹.html",
    "revision": "64bfee3f033a0aba15eb60558c522662"
  },
  {
    "url": "Jenkins_DevTools/index.html",
    "revision": "5b15e041d72f7a4241b72dcb03ab82c8"
  },
  {
    "url": "Jenkins_DevTools/Jenkins.html",
    "revision": "3be4c07f534265c826480e3717e597ef"
  },
  {
    "url": "Koa_BackEnd/index.html",
    "revision": "323251eed43be21279137d30d74c3b3a"
  },
  {
    "url": "Koa_BackEnd/Koa.html",
    "revision": "e5133a4bf85b098296b72d4219a97e18"
  },
  {
    "url": "Linux_System/index.html",
    "revision": "e371f0ec8fca8a7ad77d32c8782acbcd"
  },
  {
    "url": "Linux_System/Linux.html",
    "revision": "e5d1d691c7e70c445a9d30482020b6df"
  },
  {
    "url": "logo.png",
    "revision": "e976f39ca44ca014dfe6cd2a219a9f3a"
  },
  {
    "url": "MySQL_BackEnd/index.html",
    "revision": "7ee96cddc6b1e581648ebb1c2704d853"
  },
  {
    "url": "MySQL_BackEnd/MySQL.html",
    "revision": "8dd1606de6ab4ef1d6e3ff37ae96cb7b"
  },
  {
    "url": "Nginx_BackEnd/index.html",
    "revision": "004e2f1543b42eb6f821932064b09059"
  },
  {
    "url": "Nginx_BackEnd/Nginx.html",
    "revision": "811990397b7543c3033e40df5b3d2d97"
  },
  {
    "url": "NodeJS_BackEnd/index.html",
    "revision": "59f929114f13c5ba32bd4d6ca413e6be"
  },
  {
    "url": "NodeJS_BackEnd/NodeJS.html",
    "revision": "ffb37bf5b59272baf0a16836346bc932"
  },
  {
    "url": "React_FrontEnd/index.html",
    "revision": "1c363aa38bd498b065819d6f5ff5a8c2"
  },
  {
    "url": "React_FrontEnd/React.html",
    "revision": "1a5264e40aeee7365b47ff9dea967dda"
  },
  {
    "url": "React_FrontEnd/Redux.html",
    "revision": "472bfb4d92e86c94526bdbda252db067"
  },
  {
    "url": "TypeScript_FrontEnd/index.html",
    "revision": "95e8c76ff5d2005db7f7edf69dbe38e0"
  },
  {
    "url": "TypeScript_FrontEnd/TypeScript.html",
    "revision": "cba39a51e06d48e2d81f6c3555d50d68"
  },
  {
    "url": "Vue_FrontEnd/index.html",
    "revision": "32e8b44656861f979c703d770af7503a"
  },
  {
    "url": "Vue_FrontEnd/Vue.html",
    "revision": "b9151a7f4f0fe714084afb03b9b7a52c"
  },
  {
    "url": "Vue_FrontEnd/Vuex.html",
    "revision": "32d7b0c05b8ca56c8ed4a9f69df656e0"
  },
  {
    "url": "Webpack_DevTools/index.html",
    "revision": "cd8b2e3842123605687c2b6fae24cdb0"
  },
  {
    "url": "Webpack_DevTools/Webpack.html",
    "revision": "ef055487da65fbb5e94bf261ae1560cc"
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
