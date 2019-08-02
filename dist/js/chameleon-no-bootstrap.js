!function(){return function e(t,o,n){function s(i,a){if(!o[i]){if(!t[i]){var l="function"==typeof require&&require;if(!a&&l)return l(i,!0);if(r)return r(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var u=o[i]={exports:{}};t[i][0].call(u.exports,function(e){return s(t[i][1][e]||e)},u,u.exports,e,t,o,n)}return o[i].exports}for(var r="function"==typeof require&&require,i=0;i<n.length;i++)s(n[i]);return s}}()({1:[function(e,t,o){!function(e){function n(e,t){var o;t=t||{},this._id=n._generateUUID(),this._promise=t.promise||Promise,this._frameId=t.frameId||"CrossStorageClient-"+this._id,this._origin=n._getOrigin(e),this._requests={},this._connected=!1,this._closed=!1,this._count=0,this._timeout=t.timeout||5e3,this._listener=null,this._installListener(),t.frameId&&(o=document.getElementById(t.frameId)),o&&this._poll(),o=o||this._createFrame(e),this._hub=o.contentWindow}n.frameStyle={display:"none",position:"absolute",top:"-999px",left:"-999px"},n._getOrigin=function(e){var t;return(t=document.createElement("a")).href=e,t.host||(t=window.location),((t.protocol&&":"!==t.protocol?t.protocol:window.location.protocol)+"//"+t.host).replace(/:80$|:443$/,"")},n._generateUUID=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})},n.prototype.onConnect=function(){var e=this;return this._connected?this._promise.resolve():this._closed?this._promise.reject(new Error("CrossStorageClient has closed")):(this._requests.connect||(this._requests.connect=[]),new this._promise(function(t,o){var n=setTimeout(function(){o(new Error("CrossStorageClient could not connect"))},e._timeout);e._requests.connect.push(function(e){if(clearTimeout(n),e)return o(e);t()})}))},n.prototype.set=function(e,t){return this._request("set",{key:e,value:t})},n.prototype.get=function(e){var t=Array.prototype.slice.call(arguments);return this._request("get",{keys:t})},n.prototype.del=function(){var e=Array.prototype.slice.call(arguments);return this._request("del",{keys:e})},n.prototype.clear=function(){return this._request("clear")},n.prototype.getKeys=function(){return this._request("getKeys")},n.prototype.close=function(){var e=document.getElementById(this._frameId);e&&e.parentNode.removeChild(e),window.removeEventListener?window.removeEventListener("message",this._listener,!1):window.detachEvent("onmessage",this._listener),this._connected=!1,this._closed=!0},n.prototype._installListener=function(){var e=this;this._listener=function(t){var o,n,s;if(!e._closed&&t.data&&"string"==typeof t.data&&("null"===t.origin?"file://":t.origin)===e._origin)if("cross-storage:unavailable"!==t.data){if(-1!==t.data.indexOf("cross-storage:")&&!e._connected){if(e._connected=!0,!e._requests.connect)return;for(o=0;o<e._requests.connect.length;o++)e._requests.connect[o](n);delete e._requests.connect}if("cross-storage:ready"!==t.data){try{s=JSON.parse(t.data)}catch(e){return}s.id&&e._requests[s.id]&&e._requests[s.id](s.error,s.result)}}else{if(e._closed||e.close(),!e._requests.connect)return;for(n=new Error("Closing client. Could not access localStorage in hub."),o=0;o<e._requests.connect.length;o++)e._requests.connect[o](n)}},window.addEventListener?window.addEventListener("message",this._listener,!1):window.attachEvent("onmessage",this._listener)},n.prototype._poll=function(){var e,t,o;o="file://"===(e=this)._origin?"*":e._origin,t=setInterval(function(){if(e._connected)return clearInterval(t);e._hub&&e._hub.postMessage("cross-storage:poll",o)},1e3)},n.prototype._createFrame=function(e){var t,o;for(o in(t=window.document.createElement("iframe")).id=this._frameId,n.frameStyle)n.frameStyle.hasOwnProperty(o)&&(t.style[o]=n.frameStyle[o]);return window.document.body.appendChild(t),t.src=e,t},n.prototype._request=function(e,t){var o,n;return this._closed?this._promise.reject(new Error("CrossStorageClient has closed")):((n=this)._count++,o={id:this._id+":"+n._count,method:"cross-storage:"+e,params:t},new this._promise(function(e,t){var s,r,i;s=setTimeout(function(){n._requests[o.id]&&(delete n._requests[o.id],t(new Error("Timeout: could not perform "+o.method)))},n._timeout),n._requests[o.id]=function(r,i){if(clearTimeout(s),delete n._requests[o.id],r)return t(new Error(r));e(i)},Array.prototype.toJSON&&(r=Array.prototype.toJSON,Array.prototype.toJSON=null),i="file://"===n._origin?"*":n._origin,n._hub.postMessage(JSON.stringify(o),i),r&&(Array.prototype.toJSON=r)}))},void 0!==t&&t.exports?t.exports=n:void 0!==o?o.CrossStorageClient=n:"function"==typeof define&&define.amd?define([],function(){return n}):e.CrossStorageClient=n}(this)},{}],2:[function(e,t,o){var n,s;n=this,s={init:function(e){var t=!0;try{window.localStorage||(t=!1)}catch(e){t=!1}if(!t)try{return window.parent.postMessage("cross-storage:unavailable","*")}catch(e){return}s._permissions=e||[],s._installListener(),window.parent.postMessage("cross-storage:ready","*")},_installListener:function(){var e=s._listener;window.addEventListener?window.addEventListener("message",e,!1):window.attachEvent("onmessage",e)},_listener:function(e){var t,o,n,r,i,a,l;if(t="null"===e.origin?"file://":e.origin,"cross-storage:poll"===e.data)return window.parent.postMessage("cross-storage:ready",e.origin);if("cross-storage:ready"!==e.data){try{n=JSON.parse(e.data)}catch(e){return}if(n&&"string"==typeof n.method&&(r=n.method.split("cross-storage:")[1])){if(s._permitted(t,r))try{a=s["_"+r](n.params)}catch(e){i=e.message}else i="Invalid permissions for "+r;l=JSON.stringify({id:n.id,error:i,result:a}),o="file://"===t?"*":t,window.parent.postMessage(l,o)}}},_permitted:function(e,t){var o,n,r;if(o=["get","set","del","clear","getKeys"],!s._inArray(t,o))return!1;for(n=0;n<s._permissions.length;n++)if((r=s._permissions[n]).origin instanceof RegExp&&r.allow instanceof Array&&r.origin.test(e)&&s._inArray(t,r.allow))return!0;return!1},_set:function(e){window.localStorage.setItem(e.key,e.value)},_get:function(e){var t,o,n,s;for(t=window.localStorage,o=[],n=0;n<e.keys.length;n++){try{s=t.getItem(e.keys[n])}catch(e){s=null}o.push(s)}return o.length>1?o:o[0]},_del:function(e){for(var t=0;t<e.keys.length;t++)window.localStorage.removeItem(e.keys[t])},_clear:function(){window.localStorage.clear()},_getKeys:function(e){var t,o,n;for(n=[],o=window.localStorage.length,t=0;t<o;t++)n.push(window.localStorage.key(t));return n},_inArray:function(e,t){for(var o=0;o<t.length;o++)if(e===t[o])return!0;return!1},_now:function(){return"function"==typeof Date.now?Date.now():(new Date).getTime()}},void 0!==t&&t.exports?t.exports=s:void 0!==o?o.CrossStorageHub=s:"function"==typeof define&&define.amd?define([],function(){return s}):n.CrossStorageHub=s},{}],3:[function(e,t,o){t.exports={CrossStorageClient:e("./client.js"),CrossStorageHub:e("./hub.js")}},{"./client.js":1,"./hub.js":2}],4:[function(e,t,o){var n,s;n=window,s=function(){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t){e.exports=class{constructor(e,t){if(this.newScrollPosition=0,this.oldScrollPositon=0,this.ticking=!1,"string"==typeof e)this.element=document.querySelector(e);else{if(!(e instanceof HTMLElement))return void console.error("StickyScroller: element is required.");this.element=e}this.element.style.overflowY="hidden",window.addEventListener("scroll",this.onWindowScroll.bind(this))}onWindowScroll(){this.newScrollPosition=window.scrollY,this.ticking||(window.requestAnimationFrame(()=>{this.translate(),this.ticking=!1,this.oldScrollPositon=this.newScrollPosition}),this.ticking=!0)}translate(){const e=this.element.parentElement.getBoundingClientRect(),t=this.newScrollPosition-this.oldScrollPositon;e.top>0&&t>0||e.bottom<window.innerHeight&&t<0||(this.element.scrollTop=this.element.scrollTop+t)}}}])},"object"==typeof o&&"object"==typeof t?t.exports=s():"function"==typeof define&&define.amd?define([],s):"object"==typeof o?o.StickyScroller=s():n.StickyScroller=s()},{}],5:[function(e,t,o){e("./settings"),e("./l10n"),e("./wiki")},{"./l10n":6,"./settings":11,"./wiki":13}],6:[function(e,t,o){e("./localization")},{"./localization":7}],7:[function(e,t,o){var n=e("./localize"),s=e("./translations");document.addEventListener("DOMContentLoaded",function(){n(".l10n",s)})},{"./localize":8,"./translations":9}],8:[function(e,t,o){t.exports=function(e,t){function o(){var o=document.documentElement.lang;if(o&&o in t)for(var n=t[o],s=document.querySelectorAll(e),r=0;r<s.length;r++){var i=s.item(r);i.dataset.msgId&&n[i.dataset.msgId]&&(i.textContent=n[i.dataset.msgId],i.placeholder&&(i.placeholder=n[i.dataset.msgId])),i.dataset.urlId&&n[i.dataset.urlId]&&i.setAttribute("href",n[i.dataset.urlId])}}o(),new MutationObserver(function(e){e.map(function(e){"attributes"===e.type&&"lang"===e.attributeName&&o()})}).observe(document.documentElement,{attributes:!0})}},{}],9:[function(e,t,o){var n={};n.da=e("../../langs/da.json"),n.de=e("../../langs/de.json"),n.en=e("../../langs/en.json"),n.es=e("../../langs/es.json"),n.et=e("../../langs/et.json"),n.fi=e("../../langs/fi.json"),n.it=e("../../langs/it.json"),n.ja=e("../../langs/ja.json"),n.ko=e("../../langs/ko.json"),n.pl=e("../../langs/pl.json"),n["pt-BR"]=e("../../langs/pt_BR.json"),n.pt=n["pt-BR"],n.ru=e("../../langs/ru.json"),n.sv=e("../../langs/sv.json"),n["zh-CN"]=e("../../langs/zh_CN.json"),n.zh=n["zh-CN"],n["zh-Hans"]=n["zh-CN"],n["zh-TW"]=e("../../langs/zh_TW.json"),n["zh-Hant"]=n["zh-TW"],t.exports=n},{"../../langs/da.json":18,"../../langs/de.json":19,"../../langs/en.json":20,"../../langs/es.json":21,"../../langs/et.json":22,"../../langs/fi.json":23,"../../langs/it.json":24,"../../langs/ja.json":25,"../../langs/ko.json":26,"../../langs/pl.json":27,"../../langs/pt_BR.json":28,"../../langs/ru.json":29,"../../langs/sv.json":30,"../../langs/zh_CN.json":31,"../../langs/zh_TW.json":32}],10:[function(e,t,o){const n=new(0,e("cross-storage").CrossStorageClient)("https://static.opensuse.org/chameleon/hub.html"),s=document.querySelector(".dark-mode-switch input");function r(e){e?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode");const t=document.getElementsByClassName("table");for(let o=0;o<t.length;o++){const n=t.item(o).classList;e?n.add("table-dark"):n.remove("table-dark")}const o=document.getElementsByClassName("navbar");for(let t=0;t<o.length;t++){const n=o.item(t).classList;e?(n.add("navbar-dark","bg-dark"),n.remove("navbar-light","bg-light")):(n.add("navbar-light","bg-light"),n.remove("navbar-dark","bg-dark"))}}n.onConnect().then(function(){n.get("isDarkMode").then(e=>{const t="true"===e;s&&(s.checked=t),r(t)})}),s&&s.addEventListener("change",function(){const e=s.checked;n.set("isDarkMode",e),r(e)})},{"cross-storage":3}],11:[function(e,t,o){e("./dark-mode-switch"),e("./language-dropdown")},{"./dark-mode-switch":10,"./language-dropdown":12}],12:[function(e,t,o){const n=new(0,e("cross-storage").CrossStorageClient)("https://static.opensuse.org/chameleon/hub.html"),s={ar:"العربية",bg:"Български",ca:"Català",cs:"Čeština",da:"Dansk",de:"Deutsch",el:"Ελληνικά",en:"English",es:"Español",fa:"فارسی",fi:"Suomi",fr:"Français",gl:"Galego",hi:"हिन्दी",hu:"Magyar",id:"Bahasa Indonesia",it:"Italiano",ja:"日本語",km:"ភាសាខ្មែរ",ko:"한국어",lt:"Lietuvių",nb:"Bokmål",nl:"Nederlands",nn:"Nynorsk",pl:"Polski","pt-BR":"Português",ro:"Română",ru:"Русский",sk:"Slovenčina",sv:"Svenska",th:"ภาษาไทย",uk:"Українська",wa:"Walon","zh-CN":"简体中文","zh-TW":"繁體中文"};n.onConnect().then(function(){!function(){var e=document.getElementById("language-dropdown");if(!e)return;const t=e.getElementsByClassName("dropdown-toggle").item(0),o=e.getElementsByClassName("dropdown-menu").item(0);if(t&&o)for(let r in s){let i=document.createElement("a");i.href="#",i.lang=r,i.textContent=s[r],i.classList.add("dropdown-item"),t.textContent=this.textContent,r===document.documentElement.lang&&i.classList.add("active"),i.addEventListener("click",function(){const s=o.getElementsByTagName("a");for(let e=0;e<s.length;e++)s.item(e).classList.remove("active");this.classList.add("active"),document.documentElement.lang=this.lang,t.textContent=this.textContent,e.classList.contains("auto-detect")&&n.set("lang",this.lang)}),o.appendChild(i)}}(),function(){const e=document.getElementById("language-dropdown");if(!e)return;const t=e.getElementsByClassName("dropdown-toggle").item(0);if(!t)return;const o=navigator.languages.find(function(e){return e in s})||"en";document.documentElement.lang=o,t.textContent=s[o],n.get("lang").then(e=>{e&&(document.documentElement.lang=e,t.textContent=s[e])})}()})},{"cross-storage":3}],13:[function(e,t,o){document.addEventListener("DOMContentLoaded",function(){document.body.classList.contains("mediawiki")&&(e("./login-modal"),e("./toc"),e("./migrations"))})},{"./login-modal":14,"./migrations":16,"./toc":17}],14:[function(e,t,o){var n=document.getElementById("login-modal-toggle");n&&n.addEventListener("click",function(){setTimeout(function(){document.getElementById("login-username").focus()},500)})},{}],15:[function(e,t,o){for(var n=document.getElementsByClassName("box"),s=0;s<n.length;s++){var r=n.item(s);r.classList.remove("box","box-shadow","infobox"),r.classList.add("card"),"right"===r.style.float?r.classList.add("ml-3"):"left"===r.style.float&&r.classList.add("mr-3");var i=document.createElement("div");i.classList.add("card-body"),i.innerHTML=r.innerHTML,r.innerHTML="",r.appendChild(i);var a=r.getElementsByTagName("img");a.length>0&&a.item(0).clientWidth>=100&&(a.item(0).classList.add("card-img-top"),r.insertBefore(a.item(0),r.firstChild));var l=r.getElementsByClassName("box-header");if(l){var c=l.item(0),u=document.createElement("h4");u.classList.add("card-title"),u.innerHTML=c.innerHTML,c.parentNode.removeChild(c),i.insertBefore(u,i.firstChild)}for(var d=i.getElementsByTagName("p"),m=0;m<d.length;m++){var p=d.item(m);if(p.getElementsByTagName("img").length||p.textContent.trim())return;p.parentNode.removeChild(p)}}},{}],16:[function(e,t,o){e("./box")},{"./box":15}],17:[function(e,t,o){var n=e("sticky-scroller"),s=document.getElementById("toc"),r=document.getElementById("toc-sidebar"),i=document.getElementById("main");r&&s&&(r.append(s),r.classList.add("d-lg-block","col-lg-3"),i.classList.add("col-lg-9"),new n(s))},{"sticky-scroller":4}],18:[function(e,t,o){t.exports={"dark-mode":"",more:"",search:"",main:"",software:"",download:"",doc:"",documentation:"",wiki:"","wiki-url":"",forum:"","forum-url":"",development:"","development-document":"","development-document-url":"","build-service":"",information:"",news:"","release-notes":"",events:"",planet:"",shop:"",community:"",connect:"","facebook-group":"","mail-lists":"","irc-channels":"","social-media":""}},{}],19:[function(e,t,o){t.exports={software:"Software",download:"Download",documentation:"Dokumentation",wiki:"Wiki","wiki-url":"https://de.opensuse.org/",forum:"Forum","forum-url":"https://forums.opensuse.org/forumdisplay.php/845-German",development:"Entwicklung","development-document":"Dokument","development-document-url":"https://de.opensuse.org/Portal:Entwicklung","build-service":"Build Service",information:"Informationen",news:"Neuigkeiten","release-notes":"Versionshinweise",events:"Veranstaltungen",planet:"Planet",shop:"Shop",community:"Community",connect:"Connect","facebook-group":"Facebook-Gruppe","google-group":"Google+-Gruppe","mail-lists":"Mailinglisten","irc-channels":"IRC-Kanäle","social-media":"Soziale Medien"}},{}],20:[function(e,t,o){t.exports={"dark-mode":"Dark Mode",more:"More",search:"Search",main:"Main",software:"Software",download:"Download",doc:"Doc",documentation:"Documentation",wiki:"Wiki","wiki-url":"https://en.opensuse.org/",forum:"Forum","forum-url":"https://forums.opensuse.org/forumdisplay.php/842-English",development:"Development","development-document":"Document","development-document-url":"https://en.opensuse.org/Portal:Development","build-service":"Build service",information:"Information",news:"News","release-notes":"Release notes",events:"Events",planet:"Planet",shop:"Shop",community:"Community",connect:"Connect","facebook-group":"Facebook group","mail-lists":"Mail lists","irc-channels":"IRC channels","social-media":"Social media"}},{}],21:[function(e,t,o){t.exports={software:"Software",download:"Descargar",documentation:"Documentación",wiki:"Wiki","wiki-url":"https://es.opensuse.org",forum:"Foro","forum-url":"https://forums.opensuse.org/forumdisplay.php/837-Espa%C3%B1ol",development:"Desarrollo","development-document":"Documento","development-document-url":"https://en.opensuse.org/Portal:Development","build-service":"Servicio de compilaciones",information:"Información",news:"Noticias","release-notes":"Informe de novedades",events:"Eventos",planet:"Planeta",shop:"Tienda",community:"Comunidad",connect:"Conectar","facebook-group":"Grupo de Facebook","google-group":"Grupo de Google+","mail-lists":"Listas de correo","irc-channels":"Canales de IRC","social-media":"Redes sociales"}},{}],22:[function(e,t,o){arguments[4][18][0].apply(o,arguments)},{dup:18}],23:[function(e,t,o){arguments[4][18][0].apply(o,arguments)},{dup:18}],24:[function(e,t,o){arguments[4][18][0].apply(o,arguments)},{dup:18}],25:[function(e,t,o){t.exports={software:"ソフトウエア",download:"ダウンロード",documentation:"ドキュメンテーション",wiki:"Wiki","wiki-url":"https://ja.opensuse.org/",forum:"フォーラム","forum-url":"https://forum.geeko.jp/",development:"開発","development-document":"文書","development-document-url":"https://ja.opensuse.org/Portal:%E9%96%8B%E7%99%BA","build-service":"Build サービス",information:"情報",news:"ニュース","release-notes":"リリースノート",events:"イベント",planet:"Planet",shop:"ショップ",community:"コミュニティ",connect:"Connect","facebook-group":"Facebook グループ","google-group":"Google+ グループ","mail-lists":"メーリングリスト","irc-channels":"IRC チャンネル","social-media":"ソーシャルメディア"}},{}],26:[function(e,t,o){arguments[4][18][0].apply(o,arguments)},{dup:18}],27:[function(e,t,o){arguments[4][18][0].apply(o,arguments)},{dup:18}],28:[function(e,t,o){t.exports={software:"Software",download:"Baixar",documentation:"Documentação",wiki:"Wiki","wiki-url":"https://pt.opensuse.org/",forum:"Fórum (apenas inglês)","forum-url":"https://forums.opensuse.org/forumdisplay.php/842-English",development:"Desenvolvimento","development-document":"Documento","development-document-url":"https://en.opensuse.org/Portal:Development","build-service":"Serviço de compilação",information:"Informação",news:"Notícias","release-notes":"Notas de lançamento",events:"Eventos",planet:"Planeta",shop:"Loja",community:"Comunidade",connect:"Connect","facebook-group":"Grupo no Facebook","google-group":"Grupo no Google+","mail-lists":"Listas de discussão","irc-channels":"Canais IRC","social-media":"Mídias sociais"}},{}],29:[function(e,t,o){t.exports={software:"Программное обеспечение",download:"Скачать",documentation:"Документация",wiki:"Вики","wiki-url":"https://ru.opensuse.org/",forum:"Форум","forum-url":"http://forums.opensuse.org/forumdisplay.php/909-P%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9-(Russian)",development:"Разработка","development-document":"Документ","development-document-url":"https://en.opensuse.org/Portal:Development","build-service":"Служба сборки",information:"Информация",news:"Новости","release-notes":"Примечания к выпуску",events:"События",planet:"Планета",shop:"Магазин",community:"Сообщество",connect:"Connect","facebook-group":"Группа на Facebook","google-group":"Группа в Google+","mail-lists":"Списки рассылки","irc-channels":"IRC-каналы","social-media":"Социальные сети"}},{}],30:[function(e,t,o){t.exports={software:"",download:"",documentation:"",wiki:"","wiki-url":"",forum:"","forum-url":"",development:"","development-document":"","development-document-url":"","build-service":"",information:"",news:"","release-notes":"",events:"",planet:"",shop:"",community:"",connect:"","facebook-group":"","mail-lists":"","irc-channels":"","social-media":""}},{}],31:[function(e,t,o){t.exports={software:"软件",download:"下载",documentation:"文档",wiki:"维基","wiki-url":"https://zh.opensuse.org/",forum:"论坛","forum-url":"https://forum.suse.org.cn/",development:"开发","development-document":"开发文档","development-document-url":"https://zh.opensuse.org/Portal:%E5%BC%80%E5%8F%91","build-service":"构建服务 (OBS)",information:"信息",news:"新闻","release-notes":"发行说明",events:"活动",planet:"星球",shop:"商店",community:"社群",connect:"连接","facebook-group":"Facebook 群组","google-group":"Google+ 群组","mail-lists":"邮件列表","irc-channels":"IRC 频道","social-media":"社交媒体"}},{}],32:[function(e,t,o){t.exports={software:"軟體",download:"下載",documentation:"文件",wiki:"Wiki","wiki-url":"https://zh-tw.opensuse.org/",forum:"論壇","forum-url":"https://forum.suse.org.cn/",development:"開發","development-document":"開發文件","development-document-url":"https://en.opensuse.org/Portal:Development","build-service":"建構服務 (OBS)",information:"資訊",news:"新聞","release-notes":"發行紀錄",events:"活動",planet:"星球",shop:"商店",community:"社群",connect:"連線","facebook-group":"Facebook 群組","google-group":"Google+ 群組","mail-lists":"郵件列表","irc-channels":"IRC 頻道","social-media":"社群媒體"}},{}]},{},[5]);
//# sourceMappingURL=chameleon-no-bootstrap.js.map
