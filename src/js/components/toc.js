const StickyScroller = require("sticky-scroller");

const toc = document.getElementById("toc");

if (toc) {
  new StickyScroller(toc); // scroll with the page magically

  const headings = document.querySelectorAll(
    ".toc-scope h2, .toc-scope h3, .toc-scope h4, .toc-scope h5, .toc-scope h6"
  );
}
