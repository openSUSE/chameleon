// Move table of contents to sidebar
// Also see css/toc.css
var StickyScroller = require("sticky-scroller");
var toc = document.getElementById("toc");
var sidebar = document.getElementById("toc-sidebar");
var main = document.getElementById("main");

if (sidebar) {
  if (toc) {
    sidebar.append(toc);
    sidebar.classList.add('d-lg-block', 'col-lg-3');
    main.classList.add('col-lg-9');
    new StickyScroller(toc);
  }
}
