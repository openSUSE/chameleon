// Add anchor icons to headings

const headlines = document.getElementsByClassName("mw-headline");

for (let i = 0; i < headlines.length; i++) {
  const headline = headlines.item(i);
  const link = document.createElement("a");
  link.href = "#" + headline.id;
  link.innerHTML = '<svg class="icon"><use xlink:href="#links-line"></svg>';
  headline.after(link);
}
