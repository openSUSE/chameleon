/**
 * Automatically focus username input after opening login modal.
 * This is a fallback for old Firefox (<= 57) because autofocus property doesn't
 * work and cause style loading issues.
 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=1404468
 */
var toggle = document.getElementById("login-modal-toggle");

if (toggle) {
  toggle.addEventListener('click', function () {
    // Must set focus after modal shown, otherwise it won't focus or wrong
    // position of auto-fill menu
    setTimeout(function () {
      document.getElementById("login-username").focus();
    }, 500);
  });
}
