document.addEventListener("DOMContentLoaded", function() {
  if (document.body.classList.contains("mediawiki")) {
    require("./anchor");
    require("./edit-section");
    require("./login-modal");
    require("./toc");
    require("./migrations");
  }
});
