var languages = {
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
 * When to use:
 *
 * When not to use: in wiki, server side will add language attributes
 */
function autoDetectLanguage() {
  var language =
    localStorage.getItem("lang") ||
    navigator.languages.find(function (lang) {
      return lang in languages;
    }) ||
    "en";

  document.documentElement.lang = language;

  var dropdown = document.getElementById("language-dropdown");

  if (dropdown) {
    const toggle = dropdown.getElementsByClassName('dropdown-toggle').item(0);
    if (toggle) {
      toggle.textContent = languages[language];
    }
  }
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
    });
    menu.appendChild(item);
  }

  toggle.textContent = document.documentElement.lang;
}

document.addEventListener('DOMContentLoaded', function () {
  renderLanguageSelect();
  autoDetectLanguage();
});
