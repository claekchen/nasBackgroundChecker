"use strict";var precacheConfig=[["/index.html","d702017c08f68288391ca68f1065b192"],["/static/css/main.96c6c3d2.css","79347bcf93efdf06d6b8f501da2ca80f"],["/static/js/main.3e41ee0e.js","da22843915f3f1e4a022706d5811f058"],["/static/media/index.00b66c23.less","00b66c23bbb239a6c660ac4561277f18"],["/static/media/index.0c852203.less","0c85220371c838dec961371d47b4a2af"],["/static/media/index.11dd26b8.less","11dd26b80205bf53a460883a27cf1da3"],["/static/media/index.14e76e88.less","14e76e8892503d91953d3421a36cd42b"],["/static/media/index.22cfa8e2.less","22cfa8e2e13b9c4b48e8b39fcee1cf47"],["/static/media/index.2998f15e.less","2998f15ea8770703140df2f0a5f130f9"],["/static/media/index.39354dd3.less","39354dd375d1b909cc9f768993d45445"],["/static/media/index.3d40ce26.less","3d40ce26b69530f16eb1d636ace5038b"],["/static/media/index.62567c9e.less","62567c9eedd64668613636d7e2b810aa"],["/static/media/index.687ed6ab.less","687ed6ab4232a44bc792cd0b840f7418"],["/static/media/index.719a2db6.less","719a2db697f31cf34dc9353d71d589af"],["/static/media/index.85080bfd.less","85080bfdde750fb3208fc916fd8d21a7"],["/static/media/index.93eb4e77.less","93eb4e77786fc4f9c0f2834c06bdeca1"],["/static/media/index.93ed363f.less","93ed363f9063f087682f2c97d29d2473"],["/static/media/index.ad40a8aa.less","ad40a8aaf2fd0aa36c1940970c684560"],["/static/media/index.adac5da8.less","adac5da8cdc8ee9565d41abdb5265138"],["/static/media/index.bc0e5f81.less","bc0e5f81f304a43dd586f911a1102972"],["/static/media/index.c7b73e63.less","c7b73e6364bcce2a472401d049235f1a"],["/static/media/index.c9ea049e.less","c9ea049e82be19a0252d655e743c624f"],["/static/media/index.cdcf9d91.less","cdcf9d91ad1b654e62697e23fd6082cb"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var s=new URL(e);return n&&s.pathname.match(n)||(s.search+=(s.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),s.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),s=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),s]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var s="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(s,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});