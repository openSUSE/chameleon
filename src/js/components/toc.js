const StickyScroller = require("sticky-scroller");

const toc = document.querySelector(".toc");

const lastIds = ["", "", "", "", ""];
const regNonWord = /[\ \-\#\/\\\.\,\"\'\:\;\[\]\{\}\&\%\$\@\!\~\+\=\<\>]+/g;
const regNumber = /^\d+/;
let showNumber = true;

if (toc) {
  new StickyScroller(toc); // scroll with the page magically

  const scope = document.querySelector(".toc-scope");

  if (scope) {
    const headings = scope.querySelectorAll(
      "h2:not(.no-toc), h3:not(.no-toc), h4:not(.no-toc), h5:not(.no-toc), h6:not(.no-toc)"
    );

    const list = [];
    let numberCounter = 0;

    headings.forEach(function(h) {
      const level = parseInt(h.tagName.substr(1)) - 2;
      linkHead(h, level);
      const item = {};
      item.link = "#" + h.id;
      item.text = h.textContent.trim();
      if (regNumber.test(item.text)) {
        numberCounter++;
      }
      pushItem(list, item, level);
    });

    // In changelog, there are already heading numbers. So we don't need to show
    // additional numbers anymore.
    showNumber = numberCounter < 5;
    const listEl = document.createElement("ul");
    toc.append(listEl);
    renderList(listEl, list);
  }
}

function linkHead(h, level) {
  if (!h.id) {
    let id = "";
    if (level > 0) {
      id += lastIds[level - 1] + "-";
    }
    id += h.textContent
      .trim()
      .toLowerCase()
      .replace(regNonWord, "-");

    h.id = id;
  }

  lastIds[level] = h.id;
}

function pushItem(list, item, level) {
  if (level === 0) {
    list.push(item);
  } else {
    if (!list.length) {
      list.push({ link: "#", text: "???" });
    }
    const parent = list[list.length - 1];
    if (!parent.children) {
      parent.children = [];
    }
    pushItem(parent.children, item, level - 1);
  }
}

function renderList(listEl, list, prefix = "") {
  list.forEach(function(item, i) {
    const itemEl = document.createElement("li");
    const linkEl = document.createElement("a");
    listEl.append(itemEl);
    itemEl.append(linkEl);
    linkEl.href = item.link;
    if (showNumber) {
      linkEl.textContent = prefix + (i + 1) + ". " + item.text;
    } else {
      linkEl.textContent = item.text;
    }

    if (item.children) {
      const childrenEl = document.createElement("ul");
      itemEl.append(childrenEl);
      renderList(childrenEl, item.children, prefix + (i + 1) + ".");
    }
  });
}
