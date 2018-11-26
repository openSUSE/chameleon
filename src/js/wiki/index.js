document.addEventListener('DOMContentLoaded', function () {
  if (document.body.classList.contains('mediawiki')) {
    require("./login-modal");
    require("./toc");
    require("./migrations");
  }
});
