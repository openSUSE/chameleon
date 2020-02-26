const sprite = require("../data/sprite");

const div = document.createElement("div");
div.className = "d-none";
div.innerHTML = sprite;
document.body.append(div);
