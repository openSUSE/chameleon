/**
 * Switch to toggle light/dark theme.
 *
 * This setting is a cross-site feature via cross-storage package.
 * Since cross-storage sometimes timeout, we use localStorage as fallback.
 */

const CrossStorageClient = require("cross-storage").CrossStorageClient;

const crossStorage = new CrossStorageClient(
  "https://static.opensuse.org/chameleon/hub.html"
);

let mode = "auto";

readMode();

const toggler = document.createElement("button");
toggler.className = "navbar-toggler darkmode-toggler";
toggler.type = "button";
toggler.innerHTML =
  '<span class="navbar-toggler-icon darkmode-toggler-icon"></span>';
toggler.addEventListener("click", function() {
  toggleMode();
  applyMode();
  writeMode();
});

function toggleMode() {
  switch (mode) {
    case "light":
      return (mode = "dark");
    case "dark":
      return (mode = "auto");
    default:
      return (mode = "light");
  }
}

function readMode() {
  // localStorage is faster and doesn't timeout. It is a fallback option.
  mode = localStorage.getItem("chameleon_mode");

  // Then try the cross storage option.
  crossStorage.onConnect().then(function() {
    crossStorage.get("chameleon_mode").then(value => {
      mode = value;
      applyMode();
    });
  });
}

function writeMode() {
  localStorage.setItem("chameleon_mode", mode);
  crossStorage.set("chameleon_mode", mode);
}

function applyMode() {
  document.body.classList.remove("dark-mode", "light-mode", "auto-mode");
  document.body.classList.add(mode + "-mode");
}

document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.append(toggler);
  }
});
