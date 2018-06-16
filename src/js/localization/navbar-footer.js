/**
 * Front-end localization for navbar and footer
 */

var localize = require("./localize");

var translations = [];

translations.en = require("../../langs/en.json");

localize("#global-navbar .l10n, #global-footer .l10n", translations);
