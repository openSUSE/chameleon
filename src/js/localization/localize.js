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
      if (element.dataset["msg-id"]) {
        element.textContent = translation[element.dataset["msg-id"]];
      }

      if (element.dataset["url-id"]) {
        element.setAttribute('href', translation[element.dataset["url-id"]]);
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
