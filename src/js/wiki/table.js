const tables = document.getElementsByClassName("wikitable");

while (tables.length) {
  const list = tables.item(0).classList;
  list.add("table");
  list.remove("wikitable");
}
