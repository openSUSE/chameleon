function localize(selector, translations) {
  function localizeString() {
    /**
     * Detect language
     */
    var lang = document.documentElement.lang;

    if (!lang || !(lang in translations)) {
      lang = "en"; // Use English if it is not a supported locale
    }

    var translation = translations[lang];

    /**
     * Replace translateable string
     */
    $(function() {
      $(selector).each(function() {
        if ($(this).data("msg-id")) {
          var text = translation[$(this).data("msg-id")];
          $(this).text(text);
        }

        if ($(this).data("url-id")) {
          var url = translation[$(this).data("url-id")];
          $(this).attr("href", url);
        }
      });
    });
  }

  localizeString();

  var observer = new MutationObserver(function(mutationsList) {
    mutationsList.map(function(mutation) {
      if (mutation.type === "attributes" && mutation.attributeName === "lang") {
        localizeString();
      }
    });
  });

  observer.observe(document.documentElement, { attributes: true });
}

module.exports = localize;
