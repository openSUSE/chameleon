// The "Edit" text is replaced with a pencil icon.
// See also src/sass/wiki/_edit-section.scss

const editButtons = document.querySelectorAll(".mw-editsection a");

for (let i = 0; i < editButtons.length; i++) {
  const button = editButtons.item(i);
  const link = button.getElementsByTagName("a");
  link.innerHTML = '<svg class="icon"><use xlink:href="#pencil-line"></svg>';
}
