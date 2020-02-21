/**
 * Switch to toggle light/dark theme.
 *
 * This setting is a cross-site feature via cross-storage package.
 * Since cross-storage sometimes timeout, we use cookies as fallback.
 */

const Cookies = require("js-cookie");
const CrossStorageClient = require("cross-storage").CrossStorageClient;

const key = "chameleon_mode";

const crossStorage = new CrossStorageClient(
  "https://static.opensuse.org/chameleon/hub.html"
);

let mode = "auto";

const toggler = document.createElement("button");
toggler.className = "navbar-toggler darkmode-toggler";
toggler.type = "button";
toggler.innerHTML =
  '<svg class="icon"><use xlink:href="#lightbulb-line"></use></svg>';
toggler.addEventListener("click", function() {
  toggleMode();
  applyMode();
  writeMode();
});

readMode();

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
  // Cookies doesn't time out and can serve as a fallback.
  mode = Cookies.get(key);
  applyMode();

  // Then try the cross storage option.
  crossStorage.onConnect().then(function() {
    crossStorage.get(key).then(value => {
      mode = value;
      applyMode();
    });
  });
}

function writeMode() {
  Cookies.set(key, mode);
  crossStorage.set(key, mode);
}

function applyMode() {
  document.body.classList.remove("dark-mode", "light-mode", "auto-mode");
  document.body.classList.add(mode + "-mode");
  switch (mode) {
    case "dark":
      toggler.innerHTML =
        '<svg class="icon"><use xlink:href="#moon-line"></use></svg>';
      break;
    case "light":
      toggler.innerHTML =
        '<svg class="icon"><use xlink:href="#sun-line"></use></svg>';
      break;
    default:
      toggler.innerHTML =
        '<svg class="icon"><use xlink:href="#lightbulb-line"></use></svg>';
      break;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.append(toggler);
  }
});
