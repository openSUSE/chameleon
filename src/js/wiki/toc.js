// Move table of contents to sidebar
// Also see css/toc.css
var toc = document.getElementById('toc');
var sidebar = document.getElementById('toc-sidebar');

if (sidebar) {
  if (toc) {
    sidebar.append(toc);
  } else {
    sidebar.classList.remove("d-md-block");
    sidebar.classList.add("d-xl-block");
  }
}
