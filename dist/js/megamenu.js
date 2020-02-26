(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const sections = require("../data/sites");
const localize = require("../util/localize");
const langs = require("../data/langs");

const modal = document.createElement("div");
modal.className = "megamenu animated fast";
modal.style.display = "none";

const content = sections
  .map(function(section) {
    const links = section.links
      .map(function(link) {
        return `<li><a class="l10n" href="${link.url}" data-msg-id="${link.id}" data-url-id="${link.id}-url">${link.title}</a></li>`;
      })
      .join("");

    return `
<div class="col-6 col-md-4 mb-5">
  <h5 class="megamenu-heading l10n" data-msg-id="${section.id}">${section.title}</h5>
  <ul class="megamenu-list">
    ${links}
  </ul>
</div>
  `;
  })
  .join("");

modal.innerHTML = `
<div class="megamenu-header">
  <h3 class="megamenu-title l10n" data-msg-id="opensuse-universe">openSUSE Universe</h3>
  <button class="megamenu-close ml-auto" type="button">
    <svg class="icon"><use xlink:href="#close-line"></use></svg>
  </button>
</div>
<div class="megamenu-content">
  <div class="container-fluid">
    <div class="row">
      ${content}
    </div>
  </div>
</div>
`;

const toggler = document.createElement("button");
toggler.className = "navbar-toggler megamenu-toggler";
toggler.type = "button";
toggler.innerHTML =
  '<svg class="icon"><use xlink:href="#apps-line"></use></svg>';

document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.append(toggler);
    document.body.append(modal);
  }

  localize(".l10n", langs);

  toggler.addEventListener("click", function() {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    modal.style.display = "flex";
    modal.classList.remove("fadeOut");
    modal.classList.add("fadeIn");
    document.body.style.paddingRight = scrollbarWidth + "px";
    document.body.style.overflow = "hidden";
  });

  modal.addEventListener("click", function() {
    modal.classList.remove("fadeIn");
    modal.classList.add("fadeOut");
    setTimeout(function() {
      modal.style.display = "none";
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    }, 800);
  });
});

},{"../data/langs":2,"../data/sites":3,"../util/localize":4}],2:[function(require,module,exports){
const langs = {};

langs["da"] = require("../../langs/da.json");
langs["de"] = require("../../langs/de.json");
langs["en"] = require("../../langs/en.json");
langs["es"] = require("../../langs/es.json");
langs["et"] = require("../../langs/et.json");
langs["fi"] = require("../../langs/fi.json");
langs["it"] = require("../../langs/it.json");
langs["ja"] = require("../../langs/ja.json");
langs["ko"] = require("../../langs/ko.json");
langs["pl"] = require("../../langs/pl.json");
langs["pt-BR"] = require("../../langs/pt_BR.json");
langs["pt"] = langs["pt-BR"];
langs["ru"] = require("../../langs/ru.json");
langs["sv"] = require("../../langs/sv.json");
langs["zh-CN"] = require("../../langs/zh_CN.json");
langs["zh"] = langs["zh-CN"];
langs["zh-Hans"] = langs["zh-CN"];
langs["zh-TW"] = require("../../langs/zh_TW.json");
langs["zh-Hant"] = langs["zh-TW"];

module.exports = langs;

},{"../../langs/da.json":5,"../../langs/de.json":6,"../../langs/en.json":7,"../../langs/es.json":8,"../../langs/et.json":9,"../../langs/fi.json":10,"../../langs/it.json":11,"../../langs/ja.json":12,"../../langs/ko.json":13,"../../langs/pl.json":14,"../../langs/pt_BR.json":15,"../../langs/ru.json":16,"../../langs/sv.json":17,"../../langs/zh_CN.json":18,"../../langs/zh_TW.json":19}],3:[function(require,module,exports){
module.exports = [
  {
    id: "main",
    title: "Main",
    links: [
      {
        id: "main-site",
        title: "Main site",
        url: "https://www.opensuse.org/"
      },
      {
        id: "software",
        title: "Software",
        url: "https://software.opensuse.org/"
      },
      {
        id: "wiki",
        title: "Wiki",
        url: "https://en.opensuse.org/"
      },
      {
        id: "documentation",
        title: "Documentation",
        url: "https://doc.opensuse.org/"
      },
      {
        id: "forum",
        title: "Forum",
        url: "https://forums.opensuse.org/"
      }
    ]
  },
  {
    id: "development",
    title: "Development",
    links: [
      {
        id: "build-service",
        title: "Build service",
        url: "https://build.opensuse.org/"
      },
      {
        id: "bugzilla",
        title: "Bugzilla",
        url: "https://bugzilla.opensuse.org/"
      },
      {
        id: "github",
        title: "GitHub",
        url: "https://github.com/opensuse"
      },
      {
        id: "openaq",
        title: "openQA",
        url: "https://openqa.opensuse.org/"
      },
      {
        id: "weblate",
        title: "Weblate",
        url: "https://l10n.opensuse.org/"
      }
    ]
  },
  {
    id: "information",
    title: "Information",
    links: [
      {
        id: "news",
        title: "News",
        url: "https://news.opensuse.org/"
      },
      {
        id: "events",
        title: "Events",
        url: "https://events.opensuse.org/"
      },
      {
        id: "planet",
        title: "Planet",
        url: "https://planet.opensuse.org/"
      },
      {
        id: "shop",
        title: "Shop",
        url: "https://shop.opensuse.org/"
      },
      {
        id: "status",
        title: "Status",
        url: "https://status.opensuse.org/"
      }
    ]
  },
  {
    id: "community",
    title: "Community",
    links: [
      {
        id: "irc-channels",
        title: "IRC channels",
        url: "https://en.opensuse.org/openSUSE:IRC_list"
      },
      {
        id: "mail-lists",
        title: "Mail lists",
        url: "https://en.opensuse.org/openSUSE:Mailing_lists_subscription"
      },
      {
        id: "facebook-group",
        title: "Facebook group",
        url: "https://www.facebook.com/groups/opensuseproject"
      },
      {
        id: "telegram-group",
        title: "Telegram group",
        url: "https://t.me/opensuseusers"
      },
      {
        id: "reddit",
        title: "Reddit",
        url: "https://reddit.com/r/openSUSE"
      }
    ]
  },
  {
    id: "social-media",
    title: "Social Media",
    links: [
      {
        id: "mastodon",
        title: "Mastodon",
        url: "https://fosstodon.org/@opensuse"
      },
      {
        id: "telegram",
        title: "Telegram",
        url: "https://t.me/opensusenews"
      },
      {
        id: "facebook",
        title: "Facebook",
        url: "https://www.facebook.com/en.openSUSE"
      },
      {
        id: "twitter",
        title: "Twitter",
        url: "https://twitter.com/opensuse"
      },
      {
        id: "youtube",
        title: "YouTube",
        url: "https://www.youtube.com/user/opensusetv"
      }
    ]
  },
  {
    title: "Other",
    links: [
      {
        id: "packman",
        title: "Packman",
        url: "http://packman.links2linux.org/"
      },
      {
        id: "kubic",
        title: "Kubic",
        url: "https://kubic.opensuse.org/"
      },
      {
        id: "guide-unofficial",
        title: "Guide (unofficial)",
        url: "https://opensuse-guide.org/"
      },
      {
        id: "mirrors",
        title: "Mirrors",
        url: "https://mirrors.opensuse.org/"
      },
      {
        id: "lizards",
        title: "Lizards",
        url: "https://lizards.opensuse.org/"
      }
    ]
  }
];

},{}],4:[function(require,module,exports){
function localize(selector, translations) {
  function localizeString() {
    /**
     * Detect language
     */
    var lang = document.documentElement.lang;

    if (!lang || !(lang in translations)) {
      return;
    }

    var translation = translations[lang];

    /**
     * Replace translateable string
     */
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      var element = elements.item(i);
      if (element.dataset.msgId) {
        if (translation[element.dataset.msgId]) {
          element.textContent = translation[element.dataset.msgId];
          if (element.placeholder) {
            element.placeholder = translation[element.dataset.msgId];
          }
        }
      }

      if (element.dataset.urlId) {
        if (translation[element.dataset.urlId]) {
          element.setAttribute('href', translation[element.dataset.urlId]);
        }
      }
    }
  }

  localizeString();

  var observer = new MutationObserver(function (mutationsList) {
    mutationsList.map(function (mutation) {
      if (mutation.type === "attributes" && mutation.attributeName === "lang") {
        localizeString();
      }
    });
  });

  observer.observe(document.documentElement, { attributes: true });
}

module.exports = localize;

},{}],5:[function(require,module,exports){
module.exports={
    "dark-mode": "Mørk tilstand",
    "more": "Mere",
    "search": "Søgning",
    "main": "Hoved",
    "software": "Software",
    "download": "Download",
    "doc": "Dok",
    "documentation": "Dokumentation",
    "wiki": "Wiki",
    "wiki-url": "https://en.opensuse.org/",
    "forum": "Forum",
    "forum-url": "https://forums.opensuse.org/forumdisplay.php/842-English",
    "development": "Udvikling",
    "development-document": "Dokument",
    "development-document-url": "https://en.opensuse.org/Portal:Development",
    "build-service": "Byggetjeneste",
    "information": "Information",
    "news": "Nyheder",
    "release-notes": "Udgivelsesnoter",
    "events": "Begivenheder",
    "planet": "Planet",
    "shop": "Butik",
    "community": "Fællesskab",
    "connect": "Vær med",
    "facebook-group": "Facebook-gruppe",
    "mail-lists": "Mailinglister",
    "irc-channels": "IRC-kanaler",
    "social-media": "Socialemedier"
}

},{}],6:[function(require,module,exports){
module.exports={
    "software": "Software",
    "download": "Download",
    "documentation": "Dokumentation",
    "wiki": "Wiki",
    "wiki-url": "https://de.opensuse.org/",
    "forum": "Forum",
    "forum-url": "https://forums.opensuse.org/forumdisplay.php/845-German",
    "development": "Entwicklung",
    "development-document": "Dokument",
    "development-document-url": "https://de.opensuse.org/Portal:Entwicklung",
    "build-service": "Build Service",
    "information": "Informationen",
    "news": "Neuigkeiten",
    "release-notes": "Versionshinweise",
    "events": "Veranstaltungen",
    "planet": "Planet",
    "shop": "Shop",
    "community": "Community",
    "connect": "Connect",
    "facebook-group": "Facebook-Gruppe",
    "google-group": "Google+-Gruppe",
    "mail-lists": "Mailinglisten",
    "irc-channels": "IRC-Kanäle",
    "social-media": "Soziale Medien",
    "dark-mode": "Dunkler Modus",
    "more": "Mehr",
    "search": "Suche",
    "main": "Main",
    "doc": "Doc",
    "opensuse-universe": "openSUSE Universum",
    "main-site": "Hauptseite",
    "telegram-group": "Telegram-Gruppe",
    "telegram-group-url": "https://t.me/opensuseusers",
    "other": "Andere",
    "guide-unofficial": "Leitfaden (inoffiziell)",
    "mirrors": "Mirrors",
    "lizards": "Lizards"
}

},{}],7:[function(require,module,exports){
module.exports={
  "dark-mode": "Dark Mode",
  "opensuse-universe": "openSUSE Universe",
  "search": "Search",
  "main": "Main",
  "main-site": "Main site",
  "software": "Software",
  "download": "Download",
  "doc": "Doc",
  "documentation": "Documentation",
  "wiki": "Wiki",
  "wiki-url": "https://en.opensuse.org/",
  "forum": "Forum",
  "forum-url": "https://forums.opensuse.org/forumdisplay.php/842-English",
  "development": "Development",
  "development-document": "Document",
  "development-document-url": "https://en.opensuse.org/Portal:Development",
  "build-service": "Build service",
  "information": "Information",
  "news": "News",
  "release-notes": "Release notes",
  "events": "Events",
  "planet": "Planet",
  "shop": "Shop",
  "community": "Community",
  "connect": "Connect",
  "facebook-group": "Facebook group",
  "telegram-group": "Telegram group",
  "telegram-group-url": "https://t.me/opensuseusers",
  "mail-lists": "Mail lists",
  "irc-channels": "IRC channels",
  "social-media": "Social media",
  "other": "Other",
  "guide-unofficial": "Guide (unofficial)",
  "mirrors": "Mirrors",
  "lizards": "Lizards"
}

},{}],8:[function(require,module,exports){
module.exports={
    "software": "Software",
    "download": "Descargar",
    "documentation": "Documentación",
    "wiki": "Wiki",
    "wiki-url": "https://es.opensuse.org",
    "forum": "Foro",
    "forum-url": "https://forums.opensuse.org/forumdisplay.php/837-Espa%C3%B1ol",
    "development": "Desarrollo",
    "development-document": "Documento",
    "development-document-url": "https://en.opensuse.org/Portal:Development",
    "build-service": "Servicio de compilaciones",
    "information": "Información",
    "news": "Noticias",
    "release-notes": "Informe de novedades",
    "events": "Eventos",
    "planet": "Planeta",
    "shop": "Tienda",
    "community": "Comunidad",
    "connect": "Conectar",
    "facebook-group": "Grupo de Facebook",
    "google-group": "Grupo de Google+",
    "mail-lists": "Listas de correo",
    "irc-channels": "Canales de IRC",
    "social-media": "Redes sociales"
}

},{}],9:[function(require,module,exports){
module.exports={
    "dark-mode": "Tume kujundus",
    "more": "Veel",
    "search": "Otsing",
    "main": "Peamine",
    "software": "Tarkvara",
    "download": "Allalaadimine",
    "doc": "Dokument",
    "documentation": "Dokumentatsioon",
    "wiki": "Wiki",
    "wiki-url": "https://en.opensuse.org/",
    "forum": "Foorum",
    "forum-url": "https://forums.opensuse.org/forum.php",
    "development": "Arendus",
    "development-document": "Dokument",
    "development-document-url": "https://en.opensuse.org/Portal:Development",
    "build-service": "Kompileerimise teenud",
    "information": "Informatsioon",
    "news": "Uudised",
    "release-notes": "Väljalaske teated",
    "events": "Sündmused",
    "planet": "Planeet",
    "shop": "Pood",
    "community": "Kommuun",
    "connect": "Ühenda",
    "facebook-group": "Facebooki grupp",
    "mail-lists": "Meililoend",
    "irc-channels": "IRC kanalid",
    "social-media": "Sotsiaalmeedia",
    "opensuse-universe": "openSUSE Universum",
    "main-site": "Esileht",
    "telegram-group": "Telegrammi grupp",
    "telegram-group-url": "https://t.me/opensuseusers",
    "other": "Muud",
    "guide-unofficial": "Juhend (mitteametlik)",
    "mirrors": "Peeglid",
    "lizards": "Lizard"
}

},{}],10:[function(require,module,exports){
module.exports={
    "dark-mode": "Tumma tila",
    "more": "Lisää",
    "search": "Etsi",
    "main": "Pääsivu",
    "software": "Ohjelmisto",
    "download": "Lataa",
    "doc": "Asiakirja",
    "documentation": "Dokumentointi",
    "wiki": "Wiki",
    "wiki-url": "https://en.opensuse.org/",
    "forum": "Foorumi",
    "forum-url": "https://forums.opensuse.org/forumdisplay.php/842-English",
    "development": "Tuotekehitys",
    "development-document": "Asiakirja",
    "development-document-url": "https://en.opensuse.org/Portal:Development",
    "build-service": "Rakenna palvelu",
    "information": "Informaatio",
    "news": "Uutiset",
    "release-notes": "Julkaisutiedot",
    "events": "Tapahtumat",
    "planet": "Planeetta",
    "shop": "Kauppa",
    "community": "Yhteisö",
    "connect": "Yhdistä",
    "facebook-group": "Facebook ryhmä",
    "mail-lists": "Postituslistat",
    "irc-channels": "IRC kanavat",
    "social-media": "Sosiaalinen media",
    "main-site": "Pääsivusto",
    "telegram-group": "Telegram ryhmä",
    "other": "Muut",
    "guide-unofficial": "Ohje (epävirallinen)",
    "mirrors": "Peilit"
}

},{}],11:[function(require,module,exports){
module.exports={
    "dark-mode": "Modalità Scura",
    "more": "Altro",
    "search": "Cerca",
    "main": "Principale",
    "software": "Software",
    "download": "",
    "doc": "Doc",
    "documentation": "Documentazione",
    "wiki": "Wiki",
    "wiki-url": "https://it.opensuse.org/",
    "forum": "Forum",
    "forum-url": "",
    "development": "Sviluppo",
    "development-document": "Documento",
    "development-document-url": "",
    "build-service": "Servizio di compilazione",
    "information": "Informazione",
    "news": "Novità",
    "release-notes": "Note di rilascio",
    "events": "Eventi",
    "planet": "Pianeta",
    "shop": "Negozio",
    "community": "",
    "connect": "",
    "facebook-group": "",
    "mail-lists": "",
    "irc-channels": "",
    "social-media": ""
}

},{}],12:[function(require,module,exports){
module.exports={
    "software": "ソフトウエア",
    "download": "ダウンロード",
    "documentation": "ドキュメンテーション",
    "wiki": "Wiki",
    "wiki-url": "https://ja.opensuse.org/",
    "forum": "フォーラム",
    "forum-url": "https://forum.geeko.jp/",
    "development": "開発",
    "development-document": "文書",
    "development-document-url": "https://ja.opensuse.org/Portal:%E9%96%8B%E7%99%BA",
    "build-service": "Build サービス",
    "information": "情報",
    "news": "ニュース",
    "release-notes": "リリースノート",
    "events": "イベント",
    "planet": "Planet",
    "shop": "ショップ",
    "community": "コミュニティ",
    "connect": "Connect",
    "facebook-group": "Facebook グループ",
    "google-group": "Google+ グループ",
    "mail-lists": "メーリングリスト",
    "irc-channels": "IRC チャンネル",
    "social-media": "ソーシャルメディア",
    "dark-mode": "ダークモード",
    "more": "さらに",
    "search": "検索",
    "main": "メイン",
    "doc": "文書",
    "opensuse-universe": "openSUSE Universe",
    "main-site": "メインサイト",
    "telegram-group": "Telegram グループ",
    "telegram-group-url": "https://t.me/opensuseusers",
    "other": "その他",
    "guide-unofficial": "ガイド (非公式)",
    "mirrors": "ミラー",
    "lizards": "Lizards"
}

},{}],13:[function(require,module,exports){
module.exports={
    "dark-mode": "",
    "more": "",
    "search": "",
    "main": "",
    "software": "",
    "download": "",
    "doc": "",
    "documentation": "",
    "wiki": "",
    "wiki-url": "",
    "forum": "",
    "forum-url": "",
    "development": "",
    "development-document": "",
    "development-document-url": "",
    "build-service": "",
    "information": "",
    "news": "",
    "release-notes": "",
    "events": "",
    "planet": "",
    "shop": "",
    "community": "",
    "connect": "",
    "facebook-group": "",
    "mail-lists": "",
    "irc-channels": "",
    "social-media": ""
}

},{}],14:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],15:[function(require,module,exports){
module.exports={
    "software": "Software",
    "download": "Baixar",
    "documentation": "Documentação",
    "wiki": "Wiki",
    "wiki-url": "https://pt.opensuse.org/",
    "forum": "Fórum (apenas inglês)",
    "forum-url": "https://forums.opensuse.org/forumdisplay.php/842-English",
    "development": "Desenvolvimento",
    "development-document": "Documento",
    "development-document-url": "https://en.opensuse.org/Portal:Development",
    "build-service": "Serviço de compilação",
    "information": "Informação",
    "news": "Notícias",
    "release-notes": "Notas de lançamento",
    "events": "Eventos",
    "planet": "Planeta",
    "shop": "Loja",
    "community": "Comunidade",
    "connect": "Connect",
    "facebook-group": "Grupo no Facebook",
    "google-group": "Grupo no Google+",
    "mail-lists": "Listas de discussão",
    "irc-channels": "Canais IRC",
    "social-media": "Mídias sociais",
    "dark-mode": "Modo Escuro",
    "more": "Mais",
    "search": "Pesquisa",
    "main": "Principal",
    "doc": "Doc",
    "opensuse-universe": "Universo openSUSE",
    "main-site": "Site principal",
    "telegram-group": "Grupo do Telegram",
    "telegram-group-url": "https://t.me/opensuseusers",
    "other": "Outro",
    "guide-unofficial": "Guia (não-oficial)",
    "mirrors": "Espelhos",
    "lizards": "Lagartos"
}

},{}],16:[function(require,module,exports){
module.exports={
    "software": "Программное обеспечение",
    "download": "Скачать",
    "documentation": "Документация",
    "wiki": "Вики",
    "wiki-url": "https://ru.opensuse.org/",
    "forum": "Форум",
    "forum-url": "http://forums.opensuse.org/forumdisplay.php/909-P%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9-(Russian)",
    "development": "Разработка",
    "development-document": "Документ",
    "development-document-url": "https://en.opensuse.org/Portal:Development",
    "build-service": "Служба сборки",
    "information": "Информация",
    "news": "Новости",
    "release-notes": "Примечания к выпуску",
    "events": "События",
    "planet": "Планета",
    "shop": "Магазин",
    "community": "Сообщество",
    "connect": "Connect",
    "facebook-group": "Группа на Facebook",
    "google-group": "Группа в Google+",
    "mail-lists": "Списки рассылки",
    "irc-channels": "IRC-каналы",
    "social-media": "Социальные сети",
    "dark-mode": "Тёмная тема",
    "opensuse-universe": "Вселенная openSUSE",
    "search": "Поиск",
    "main": "Главная",
    "main-site": "Основной сайт",
    "doc": "Документация",
    "telegram-group": "Группа Telegram",
    "telegram-group-url": "https://t.me/opensuseusers",
    "other": "Прочее",
    "guide-unofficial": "Руководство (неофициальное)",
    "mirrors": "Зеркала",
    "lizards": "Блоги"
}

},{}],17:[function(require,module,exports){
module.exports={
    "software": "",
    "download": "",
    "documentation": "",
    "wiki": "",
    "wiki-url": "",
    "forum": "",
    "forum-url": "",
    "development": "",
    "development-document": "",
    "development-document-url": "",
    "build-service": "",
    "information": "",
    "news": "",
    "release-notes": "",
    "events": "",
    "planet": "",
    "shop": "",
    "community": "",
    "connect": "",
    "facebook-group": "",
    "mail-lists": "",
    "irc-channels": "",
    "social-media": ""
}

},{}],18:[function(require,module,exports){
module.exports={
    "software": "软件",
    "download": "下载",
    "documentation": "文档",
    "wiki": "维基",
    "wiki-url": "https://zh.opensuse.org/",
    "forum": "论坛",
    "forum-url": "https://forum.suse.org.cn/",
    "development": "开发",
    "development-document": "开发文档",
    "development-document-url": "https://zh.opensuse.org/Portal:%E5%BC%80%E5%8F%91",
    "build-service": "构建服务 (OBS)",
    "information": "信息",
    "news": "新闻",
    "release-notes": "发行说明",
    "events": "活动",
    "planet": "星球",
    "shop": "商店",
    "community": "社群",
    "connect": "连接",
    "facebook-group": "Facebook 群组",
    "google-group": "Google+ 群组",
    "mail-lists": "邮件列表",
    "irc-channels": "IRC 频道",
    "social-media": "社交媒体",
    "dark-mode": "暗色模式",
    "more": "更多",
    "search": "搜索",
    "main": "主站",
    "doc": "文档"
}

},{}],19:[function(require,module,exports){
module.exports={
    "software": "軟體",
    "download": "下載",
    "documentation": "文件",
    "wiki": "Wiki",
    "wiki-url": "https://zh-tw.opensuse.org/",
    "forum": "論壇",
    "forum-url": "https://forum.suse.org.cn/",
    "development": "開發",
    "development-document": "開發文件",
    "development-document-url": "https://en.opensuse.org/Portal:Development",
    "build-service": "建構服務 (OBS)",
    "information": "資訊",
    "news": "新聞",
    "release-notes": "發行紀錄",
    "events": "活動",
    "planet": "星球",
    "shop": "商店",
    "community": "社群",
    "connect": "連線",
    "facebook-group": "Facebook 群組",
    "google-group": "Google+ 群組",
    "mail-lists": "郵件列表",
    "irc-channels": "IRC 頻道",
    "social-media": "社群媒體",
    "dark-mode": "暗色模式",
    "more": "更多",
    "search": "搜尋",
    "main": "主站",
    "doc": "文件"
}

},{}]},{},[1])

//# sourceMappingURL=megamenu.js.map
