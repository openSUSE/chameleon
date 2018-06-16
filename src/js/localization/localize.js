function localize(selector, translations) {
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

module.exports = localize;
