const CrossStorageClient = require('cross-storage').CrossStorageClient;

const storage = new CrossStorageClient('https://static.opensuse.org/chameleon/hub.html');
const checkbox = document.querySelector(".dark-mode-switch input");

storage.onConnect().then(function () {
  storage.get('isDarkMode').then(value => {
    const isDarkMode = value === 'true';
    if (checkbox) {
      checkbox.checked = isDarkMode;
    }
    switchDarkMode(isDarkMode);
  })
});

if (checkbox) {
  checkbox.addEventListener('change', function () {
    const isDarkMode = checkbox.checked;
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
