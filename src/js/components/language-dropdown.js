const CrossStorageClient = require('cross-storage').CrossStorageClient;

const storage = new CrossStorageClient('https://static.opensuse.org/chameleon/hub.html');

const languages = {
  ar: "العربية",
  bg: "Български",
  ca: "Català",
  cs: "Čeština",
  da: "Dansk",
  de: "Deutsch",
  el: "Ελληνικά",
  en: "English",
  es: "Español",
  fa: "فارسی",
  fi: "Suomi",
  fr: "Français",
  gl: "Galego",
  hi: "हिन्दी",
  hu: "Magyar",
  id: "Bahasa Indonesia",
  it: "Italiano",
  ja: "日本語",
  km: "ភាសាខ្មែរ",
  ko: "한국어",
  lt: "Lietuvių",
  nb: "Bokmål",
  nl: "Nederlands",
  nn: "Nynorsk",
  pl: "Polski",
  "pt-BR": "Português",
  ro: "Română",
  ru: "Русский",
  sk: "Slovenčina",
  sv: "Svenska",
  th: "ภาษาไทย",
  uk: "Українська",
  wa: "Walon",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文"
};

/**
 * Language detect order:
 * 1. Users' choice saved in local storage
 * 2. First matched browser language
 * 3. Use English as fallback language
 *
 * When to use: www.o.o, doc.o.o, only front-end static web pages
 *
 * When not to use: in wiki, server side will remember language preferences
 */
function autoDetectLanguage() {
  const dropdown = document.getElementById("language-dropdown");

  if (!dropdown) {
    return;
  }

  const toggle = dropdown.getElementsByClassName('dropdown-toggle').item(0);

  if (!toggle) {
    return;
  }

  const lang = navigator.languages.find(function (lang) {
    return lang in languages;
  }) ||
    "en";

  document.documentElement.lang = lang;
  toggle.textContent = languages[lang];

  storage.get("lang").then(lang => {
    if (lang) {
      document.documentElement.lang = lang;
      toggle.textContent = languages[lang];
    }
  })
}

function renderLanguageSelect() {
  var dropdown = document.getElementById("language-dropdown");

  if (!dropdown) {
    return;
  }

  const toggle = dropdown.getElementsByClassName('dropdown-toggle').item(0);
  const menu = dropdown.getElementsByClassName('dropdown-menu').item(0);

  if (!toggle || !menu) {
    return;
  }

  for (let lang in languages) {
    let item = document.createElement('a');
    item.href = "#";
    item.lang = lang;
    item.textContent = languages[lang];
    item.classList.add('dropdown-item');
    toggle.textContent = this.textContent;
    if (lang === document.documentElement.lang) {
      item.classList.add('active');
    }
    item.addEventListener('click', function () {
      const items = menu.getElementsByTagName('a');
      for (let i = 0; i < items.length; i++) {
        items.item(i).classList.remove('active');
      }
      this.classList.add('active');
      document.documentElement.lang = this.lang;
      toggle.textContent = this.textContent;

      if (dropdown.classList.contains('auto-detect')) {
        storage.set('lang', this.lang);
      }
    });
    menu.appendChild(item);
  }
}

storage.onConnect().then(function () {
  renderLanguageSelect();
  autoDetectLanguage();
});
