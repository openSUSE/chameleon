(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
require("./wiki/anchor");
require("./wiki/edit-section");
require("./wiki/login-modal");
require("./wiki/preferences");
require("./wiki/toc");
require("./wiki/class-name-mapping");

require("./wiki/migrations");

},{"./wiki/anchor":2,"./wiki/class-name-mapping":3,"./wiki/edit-section":4,"./wiki/login-modal":5,"./wiki/migrations":7,"./wiki/preferences":8,"./wiki/toc":9}],2:[function(require,module,exports){
// Add anchor icons to headings
// See also src/sass/wiki/_anchor.scss

const headlines = document.getElementsByClassName("mw-headline");

for (let i = 0; i < headlines.length; i++) {
  const headline = headlines.item(i);

  const wrap = document.createElement("span");
  wrap.className = "mw-anchor";

  const link = document.createElement("a");
  link.href = "#" + headline.id;
  link.innerHTML =
    '<svg class="bi bi-link-45deg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M5.712 6.96l.167-.167a1.99 1.99 0 0 1 .896-.518 1.99 1.99 0 0 1 .518-.896l.167-.167A3.004 3.004 0 0 0 6 5.499c-.22.46-.316.963-.288 1.46z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z"/><path d="M10 9.5a2.99 2.99 0 0 0 .288-1.46l-.167.167a1.99 1.99 0 0 1-.896.518 1.99 1.99 0 0 1-.518.896l-.167.167A3.004 3.004 0 0 0 10 9.501z"/></svg>';

  wrap.append(link);
  headline.after(wrap);
}

},{}],3:[function(require,module,exports){
const classNameMapping = [
  { select: 'error', remove: 'error', add: 'alert alert-danger' },
  { select: 'mw-htmlform-submit', remove: 'mw-htmlform-submit', add: 'btn btn-primary' },
  { select: 'mw-warning-with-logexcerpt', remove: 'mw-warning-with-logexcerpt', add: 'alert alert-info' },
  { select: 'wikitable', remove: 'wikitable', add: 'table' }
];

classNameMapping.forEach(m => {
  const warnings = document.getElementsByClassName(m.select);

  while (warnings.length) {
    const list = warnings.item(0).classList;
    list.add(m.add);
    list.remove(m.remove);
  }
});

},{}],4:[function(require,module,exports){
// The "Edit" text is replaced with a pencil icon.
// See also src/sass/wiki/_edit-section.scss

const wraps = document.getElementsByClassName("mw-editsection");

for (let i = 0; i < wraps.length; i++) {
  const wrap = wraps.item(i);
  const link = wrap.getElementsByTagName("a").item(0);
  link.innerHTML =
    '<svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/></svg>';
}

},{}],5:[function(require,module,exports){
/**
 * Automatically focus username input after opening login modal.
 * This is a fallback for old Firefox (<= 57) because autofocus property doesn't
 * work and cause style loading issues.
 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=1404468
 */
var toggle = document.getElementById("login-modal-toggle");

if (toggle) {
  toggle.addEventListener('click', function () {
    // Must set focus after modal shown, otherwise it won't focus or wrong
    // position of auto-fill menu
    setTimeout(function () {
      document.getElementById("login-username").focus();
    }, 500);
  });
}

},{}],6:[function(require,module,exports){
var boxes = document.getElementsByClassName('box');

for (var i = 0; i < boxes.length; i++) {
  var box = boxes.item(i);

  box.classList.remove("box", "box-shadow", "infobox");
  box.classList.add("card");

  // Margin for float card
  if (box.style.float === "right") {
    box.classList.add("ml-3");
  } else if (box.style.float === "left") {
    box.classList.add("mr-3");
  }

  // Wrap all content with a "card-body" block
  var cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = box.innerHTML;
  box.innerHTML = '';
  box.appendChild(cardBody);

  // Set card image
  var imgs = box.getElementsByTagName("img");
  if (imgs.length > 0 && imgs.item(0).clientWidth >= 100) {
    imgs.item(0).classList.add("card-img-top");
    box.insertBefore(imgs.item(0), box.firstChild);
  }

  // Set card title
  var cardHeaders = box.getElementsByClassName("box-header");
  if (cardHeaders) {
    var cardHeader = cardHeaders.item(0);
    var title = document.createElement('h4');
    title.classList.add('card-title');
    title.innerHTML = cardHeader.innerHTML;
    cardHeader.parentNode.removeChild(cardHeader);
    cardBody.insertBefore(title, cardBody.firstChild);
  }

  // Remove empty <p> tag
  var ps = cardBody.getElementsByTagName('p');
  for (var j = 0; j < ps.length; j++) {
    var p = ps.item(j);
    if (p.getElementsByTagName("img").length || p.textContent.trim()) return;
    p.parentNode.removeChild(p);
  }
}

},{}],7:[function(require,module,exports){
require("./box");

},{"./box":6}],8:[function(require,module,exports){
const preftoc = document.getElementById("preftoc");
const preferences = document.getElementById("preferences");

if (preftoc && preferences) {
  const items = preftoc.getElementsByTagName("li");
  const links = preftoc.getElementsByTagName("a");

  preftoc.classList.add("nav", "nav-pills");
  preferences.classList.add("card", "card-body", "mt-3");

  for (let i = 0; i < items.length; i++) {
    const item = items.item(i);
    item.classList.add("nav-item");
    const link = item.getElementsByTagName("a").item(0);
    link.classList.add("nav-link");
    if (item.classList.contains("selected")) {
      link.classList.add("active");
    }
    link.addEventListener("click", function () {
      for (let j = 0; j < links.length; j++) {
        links.item(j).classList.remove("active");
      }
      link.classList.add("active");
    });
  }
}

},{}],9:[function(require,module,exports){
// Move table of contents to sidebar
const toc = document.getElementById("toc");
const sidebar = document.getElementById("toc-sidebar");
const main = document.getElementById("main");

if (sidebar) {
  if (toc) {
    sidebar.append(toc);
    sidebar.classList.add("d-lg-block", "col-lg-3");
    main.classList.add("col-lg-9");
  }
}

},{}]},{},[1])

//# sourceMappingURL=chameleon-wiki.js.map
