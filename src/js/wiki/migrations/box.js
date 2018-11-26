var boxes = document.getElementsByClassName('box');

for (var i = 0; i < boxes.length; i++) {
  var box = boxes.item(i);

  box.classList.remove("box", "box-shadow", "infobox");
  box.classList.add("card");

  // Margin for float card
  if (box.style.float === "right") {
    box.classList.add("ml-3");
  } else if (box.style.float === "left") {
    box.classList.add("mr-3");
  }

  // Wrap all content with a "card-body" block
  var cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = box.innerHTML;
  box.innerHTML = '';
  box.appendChild(cardBody);

  // Set card image
  var imgs = box.getElementsByTagName("img");
  if (imgs.length > 0 && imgs.item(0).clientWidth >= 100) {
    imgs.item(0).classList.add("card-img-top");
    box.insertBefore(imgs.item(0), box.firstChild);
  }

  // Set card title
  var cardHeaders = box.getElementsByClassName("box-header");
  if (cardHeaders) {
    var cardHeader = cardHeaders.item(0);
    var title = document.createElement('h4');
    title.classList.add('card-title');
    title.innerHTML = cardHeader.innerHTML;
    cardHeader.parentNode.removeChild(cardHeader);
    cardBody.insertBefore(title, cardBody.firstChild);
  }

  // Remove empty <p> tag
  var ps = cardBody.getElementsByTagName('p');
  for (var j = 0; j < ps.length; j++) {
    var p = ps.item(j);
    if (p.getElementsByTagName("img").length || p.textContent.trim()) return;
    p.parentNode.removeChild(p);
  }
}
