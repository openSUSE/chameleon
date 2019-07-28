/**
 * Front-end localization for navbar and footer
 */

var localize = require("./localize");
var translations = require('./translations');

document.addEventListener('DOMContentLoaded', function () {
  localize("#cross-site-navbar .l10n, #site-navbar .l10n, #global-navbar .l10n, #global-footer .l10n", translations);
})
