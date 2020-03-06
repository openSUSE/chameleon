hljs.initHighlightingOnLoad();

const tables = document.getElementsByTagName("table");

for (let i = 0; i < tables.length; i++) {
  const t = tables.item(i);
  if (!t.className) {
    t.className = "table";
  }
}
