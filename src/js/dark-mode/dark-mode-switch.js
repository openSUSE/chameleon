const Cookies = require('js-cookie');

const switches = document.getElementsByClassName("dark-mode-switch");

let isDarkMode = Cookies.get('isDarkMode') === 'true';

switchDarkMode();

for (let i = 0; i < switches.length; i++) {
  const s = switches.item(i);
  const input = s.getElementsByTagName('input').item(0);
  if (!input) break;
  input.checked = isDarkMode;
  input.addEventListener('change', function () {
    isDarkMode = input.checked;
    Cookies.set('isDarkMode', isDarkMode, { expires: 365 });
    switchDarkMode();
  });
}

function switchDarkMode() {
  if (isDarkMode) {
    document.body.classList.add('bg-dark', 'text-light');
  } else {
    document.body.classList.remove('bg-dark', 'text-light');
  }
}
