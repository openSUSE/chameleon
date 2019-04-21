var translations = {};

translations["de"] = require("../../langs/de.json");
translations["en"] = require("../../langs/en.json");
translations["pt-BR"] = require("../../langs/pt_BR.json");
translations["pt"] = translations["pt-BR"];
translations["ru"] = require("../../langs/ru.json");
translations["zh-CN"] = require("../../langs/zh_CN.json");
translations["zh"] = translations["zh-CN"];
translations["zh-Hans"] = translations["zh-CN"];
translations["zh-TW"] = require("../../langs/zh_TW.json");
translations["zh-Hant"] = translations["zh-TW"];

module.exports = translations;
