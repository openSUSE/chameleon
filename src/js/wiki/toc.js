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
