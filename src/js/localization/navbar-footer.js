/**
 * Front-end localization for navbar and footer
 */

var localize = require("./localize");

var translations = {};

translations["en"] = require("../../langs/en.json");
translations["pt-BR"] = require("../../langs/pt_BR.json");
translations["zh-CN"] = require("../../langs/zh_CN.json");
translations["zh-TW"] = require("../../langs/zh_TW.json");

document.addEventListener('DOMContentLoaded', function () {
  localize("#global-navbar .l10n, #global-footer .l10n", translations);
})
