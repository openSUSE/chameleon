const CrossStorageClient = require('cross-storage').CrossStorageClient;

const storage = new CrossStorageClient('https://static.opensuse.org/chameleon/hub.html');

const switches = document.getElementsByClassName("dark-mode-switch");

let isDarkMode;

storage.onConnect().then(function () {
  isDarkMode = storage.get('isDarkMode') === 'true';
  switchDarkMode();
});

for (let i = 0; i < switches.length; i++) {
  const s = switches.item(i);
  const input = s.getElementsByTagName('input').item(0);
  if (!input) break;
  input.checked = isDarkMode;
  input.addEventListener('change', function () {
    isDarkMode = input.checked;
    storage.set('isDarkMode', isDarkMode);
    switchDarkMode();
  });
}

function switchDarkMode() {
  if (isDarkMode) {
    document.body.classList.add('bg-dark', 'text-light');
  } else {
    document.body.classList.remove('bg-dark', 'text-light');
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
