"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.install = exports.gtag = exports["default"] = void 0;
var install = function install(trackingId) {
  var additionalConfigInfo =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var scriptId = "ga-gtag";
  if (document.getElementById(scriptId)) return;
  var _document = document,
    head = _document.head;
  var script = document.createElement("script");
  script.id = scriptId;
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=".concat(
    trackingId
  );
  head.insertBefore(script, head.firstChild);
  window.dataLayer = window.dataLayer || [];
  gtag("js", new Date());
  gtag("config", trackingId, additionalConfigInfo);
};
exports.install = install;
var gtag = function gtag() {
  window.dataLayer.push(arguments);
};
exports.gtag = gtag;
var _default = gtag;
exports["default"] = _default;
