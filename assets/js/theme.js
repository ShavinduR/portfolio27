/*
 * Theme bootstrap — load synchronously in <head> BEFORE any CSS paints,
 * so there is no light-mode flash. Dark is the default; light is opt-in.
 */
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored !== 'light') document.documentElement.classList.add('dark');
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
