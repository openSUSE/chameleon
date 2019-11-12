const localize = require("./localize");
const translations = require('./translations');

document.addEventListener('DOMContentLoaded', function () {
  localize(".l10n", translations);
});
