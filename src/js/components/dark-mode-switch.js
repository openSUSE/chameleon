/**
 * Switch to toggle light/dark theme.
 *
 * This setting is a cross-site feature via cross-storage package.
 * Since cross-storage sometimes timeout, we use localStorage as fallback.
 */

const CrossStorageClient = require('cross-storage').CrossStorageClient;

const storage = new CrossStorageClient('https://static.opensuse.org/chameleon/hub.html');
const checkbox = document.getElementById("dark-mode-input");

// localStorage is faster and doesn't timeout. It is a fallback option.
const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
if (checkbox) {
  checkbox.checked = isDarkMode;
}
switchDarkMode(isDarkMode);

// Then try the cross storage option.
storage.onConnect().then(function () {
  storage.get('isDarkMode').then(value => {
    const isDarkMode = value === 'true';
    if (checkbox) {
      checkbox.checked = isDarkMode;
    }
    localStorage.setItem('isDarkMode', isDarkMode);
    switchDarkMode(isDarkMode);
  })
});

// Handle switch interaction
if (checkbox) {
  checkbox.addEventListener('change', function () {
    const isDarkMode = checkbox.checked;
    localStorage.setItem('isDarkMode', isDarkMode);
    storage.set('isDarkMode', isDarkMode);
    switchDarkMode(isDarkMode);
  });
}

function switchDarkMode(isDarkMode) {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  const tables = document.getElementsByClassName('table');

  for (let i = 0; i < tables.length; i++) {
    const classList = tables.item(i).classList;
    if (isDarkMode) {
      classList.add('table-dark');
    } else {
      classList.remove('table-dark');
    }
  }

  const navbars = document.getElementsByClassName('navbar');

  for (let i = 0; i < navbars.length; i++) {
    const classList = navbars.item(i).classList;
    if (isDarkMode) {
      classList.add('navbar-dark', 'bg-dark');
      classList.remove('navbar-light', 'bg-light');
    } else {
      classList.add('navbar-light', 'bg-light');
      classList.remove('navbar-dark', 'bg-dark');
    }
  }
}
