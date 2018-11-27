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
