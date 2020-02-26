const sections = require("../data/sites");
const localize = require("../util/localize");
const langs = require("../data/langs");

const modal = document.createElement("div");
modal.className = "megamenu animated fast";
modal.style.display = "none";

const content = sections
  .map(function(section) {
    const links = section.links
      .map(function(link) {
        return `<li><a class="l10n" href="${link.url}" data-msg-id="${link.id}" data-url-id="${link.id}-url">${link.title}</a></li>`;
      })
      .join("");

    return `
<div class="col-6 col-md-4 mb-5">
  <h5 class="megamenu-heading l10n" data-msg-id="${section.id}">${section.title}</h5>
  <ul class="megamenu-list">
    ${links}
  </ul>
</div>
  `;
  })
  .join("");

modal.innerHTML = `
<div class="megamenu-header">
  <h3 class="megamenu-title l10n" data-msg-id="opensuse-universe">openSUSE Universe</h3>
  <button class="megamenu-close ml-auto" type="button">
    <svg class="icon"><use xlink:href="#close-line"></use></svg>
  </button>
</div>
<div class="megamenu-content">
  <div class="container-fluid">
    <div class="row">
      ${content}
    </div>
  </div>
</div>
`;

const toggler = document.createElement("button");
toggler.className = "navbar-toggler megamenu-toggler";
toggler.type = "button";
toggler.innerHTML =
  '<svg class="icon"><use xlink:href="#apps-line"></use></svg>';

document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.append(toggler);
    document.body.append(modal);
  }

  localize(".l10n", langs);

  toggler.addEventListener("click", function() {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    modal.style.display = "flex";
    modal.classList.remove("fadeOut");
    modal.classList.add("fadeIn");
    document.body.style.paddingRight = scrollbarWidth + "px";
    document.body.style.overflow = "hidden";
  });

  modal.addEventListener("click", function() {
    modal.classList.remove("fadeIn");
    modal.classList.add("fadeOut");
    setTimeout(function() {
      modal.style.display = "none";
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    }, 800);
  });
});
