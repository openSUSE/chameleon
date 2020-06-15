(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
require("./wiki/anchor");
require("./wiki/edit-section");
require("./wiki/login-modal");
require("./wiki/toc");
require("./wiki/migrations");

},{"./wiki/anchor":2,"./wiki/edit-section":3,"./wiki/login-modal":4,"./wiki/migrations":6,"./wiki/toc":7}],2:[function(require,module,exports){
// Add anchor icons to headings
// See also src/sass/wiki/_anchor.scss

const headlines = document.getElementsByClassName("mw-headline");

for (let i = 0; i < headlines.length; i++) {
  const headline = headlines.item(i);

  const wrap = document.createElement("span");
  wrap.className = "mw-anchor";

  const link = document.createElement("a");
  link.href = "#" + headline.id;
  link.innerHTML = '<svg class="icon"><use xlink:href="#links"></svg>';

  wrap.append(link);
  headline.after(wrap);
}

},{}],3:[function(require,module,exports){
// The "Edit" text is replaced with a pencil icon.
// See also src/sass/wiki/_edit-section.scss

const wraps = document.getElementsByClassName("mw-editsection");

for (let i = 0; i < wraps.length; i++) {
  const wrap = wraps.item(i);
  const link = wrap.getElementsByTagName("a").item(0);
  link.innerHTML = '<svg class="icon"><use xlink:href="#pencil"></svg>';
}

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
require("./box");

},{"./box":5}],7:[function(require,module,exports){
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
