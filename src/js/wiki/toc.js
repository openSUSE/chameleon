// Move table of contents to sidebar
// Also see css/toc.css
var StickyScroller = require("sticky-scroller");
var toc = document.getElementById("toc");
var sidebar = document.getElementById("toc-sidebar");

if (sidebar) {
  if (toc) {
    sidebar.append(toc);
    new StickyScroller(toc);
  } else {
    sidebar.classList.remove("d-md-block");
    sidebar.classList.add("d-xl-block");
  }
}
