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
 */
function autoDetectLanguage() {
  var languageSelect = document.getElementById("language-select");

  var language =
    localStorage.getItem("lang") ||
    navigator.languages.find(function (lang) {
      return lang in languages;
    }) ||
    "en";

  document.documentElement.lang = language;

  languageSelect.value = language;
}

function renderLanguageSelect() {
  var languageSelect = document.getElementById("language-select");

  for (var lang in languages) {
    var option = document.createElement('option');
    option.value = lang;
    option.textContent = languages[lang];
    languageSelect.appendChild(option);
  }

  languageSelect.value = document.documentElement.lang;

  languageSelect.addEventListener('change', function () {
    var lang = languageSelect.value;
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  });
}

window.autoDetectLanguage = autoDetectLanguage;
window.renderLanguageSelect = renderLanguageSelect;
