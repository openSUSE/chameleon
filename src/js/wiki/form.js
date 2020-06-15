const buttons = document.getElementsByClassName("mw-htmlform-submit");

for (let i = 0; i < buttons.length; i++) {
  const button = buttons.item(i).classList.add("btn", "btn-primary");
}
