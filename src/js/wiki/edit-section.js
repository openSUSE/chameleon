// The "Edit" text is replaced with a pencil icon.
// See also src/sass/wiki/_edit-section.scss

const wraps = document.getElementsByClassName("mw-editsection");

for (let i = 0; i < wraps.length; i++) {
  const wrap = wraps.item(i);
  const link = wrap.getElementsByTagName("a").item(0);
  link.innerHTML = '<svg class="icon"><use xlink:href="#pencil"></svg>';
}
