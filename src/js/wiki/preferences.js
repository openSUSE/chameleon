const preftoc = document.getElementById("preftoc");
const preferences = document.getElementById("preferences");
const items = preftoc.getElementsByTagName("li");
const links = preftoc.getElementsByTagName("a");

preftoc.classList.add("nav", "nav-pills");
preferences.classList.add("card", "card-body", "mt-3");

for (let i = 0; i < items.length; i++) {
  const item = items.item(i);
  item.classList.add("nav-item");
  const link = item.getElementsByTagName("a").item(0);
  link.classList.add("nav-link");
  if (item.classList.contains("selected")) {
    link.classList.add("active");
  }
  link.addEventListener("click", function () {
    for (let j = 0; j < links.length; j++) {
      links.item(j).classList.remove("active");
    }
    link.classList.add("active");
  });
}
