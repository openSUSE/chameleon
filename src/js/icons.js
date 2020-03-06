const icons = require("./data/icons");
window.icons = icons;

let sprite = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`;
for (key in icons) {
  sprite += `<symbol viewBox="0 0 24 24" id="${key}" xmlns="http://www.w3.org/2000/svg"><path d="${icons[key]}"/></symbol>`;
}
sprite += `</svg>`;

const div = document.createElement("div");
div.style.display = "none";
div.innerHTML = sprite;
document.body.append(div);
