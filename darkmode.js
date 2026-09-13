/* ==========================================================================
   DARK MODE — Ortopeda
   Cambia el tema del sitio (clase "dark" en <html>) desde el botón
   #themeToggle que inyecta load-nav.js, y lo recuerda en localStorage.
   ========================================================================== */
(function () {
  var STORAGE_KEY = "ortopeda-theme";

  function applyTheme(theme) {
    var dark = theme === "dark";
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* almacenamiento no disponible: ignorar */
    }
  }

  var saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    saved = null;
  }
  applyTheme(saved === "dark" ? "dark" : "light");

  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest("#themeToggle") : null;
    if (!btn) return;
    var isDark = document.documentElement.classList.contains("dark");
    applyTheme(isDark ? "light" : "dark");
  });
})();