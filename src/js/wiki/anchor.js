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
