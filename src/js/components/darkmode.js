/**
 * Switch to toggle light/dark theme.
 *
 * This setting is a cross-site feature via cross-storage package.
 * Since cross-storage sometimes timeout, we use localStorage as fallback.
 */

const CrossStorageClient = require("cross-storage").CrossStorageClient;

const storage = new CrossStorageClient(
  "https://static.opensuse.org/chameleon/hub.html"
);

const togglers = document.getElementsByClassName("darkmode-toggler");

// localStorage is faster and doesn't timeout. It is a fallback option.
let isDarkMode = localStorage.getItem("isDarkMode") === "true";

// Then try the cross storage option.
storage.onConnect().then(function() {
  storage.get("isDarkMode").then(value => {
    isDarkMode = value === "true";
    switchDarkMode(isDarkMode);
  });
});

if (togglers) {
  for (let i = 0; i < togglers.length; i += 1) {
    togglers.item(i).addEventListener("click", function() {
      isDarkMode = !isDarkMode;
      switchDarkMode(isDarkMode);
    });
  }
}

function switchDarkMode(isDarkMode) {
  localStorage.setItem("isDarkMode", isDarkMode);
  storage.set("isDarkMode", isDarkMode);

  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  const tables = document.getElementsByClassName("table");

  for (let i = 0; i < tables.length; i++) {
    const classList = tables.item(i).classList;
    if (isDarkMode) {
      classList.add("table-dark");
    } else {
      classList.remove("table-dark");
    }
  }

  const navbars = document.getElementsByClassName("navbar");

  for (let i = 0; i < navbars.length; i++) {
    const classList = navbars.item(i).classList;
    if (isDarkMode) {
      classList.add("navbar-dark", "bg-dark");
      classList.remove("navbar-light", "bg-light");
    } else {
      classList.add("navbar-light", "bg-light");
      classList.remove("navbar-dark", "bg-dark");
    }
  }
}
