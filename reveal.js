/* reveal.js — Animaciones de entrada con IntersectionObserver.
   Hace visibles de forma segura los elementos con clase .reveal / .fx-*
   y los de Trayectoria marcados con [data-aos]. Si el navegador no
   soporta IntersectionObserver (o el script falla) el contenido queda
   visible por defecto: nunca se queda oculto. */
(function () {
  "use strict";

  var hasIO = "IntersectionObserver" in window;

  function show(el) {
    el.classList.add("is-visible");
  }

  // ------------------------------------------------------------------ clásicos
  var items = document.querySelectorAll(".reveal, .fx-left, .fx-right, .fx-up, .fx-zoom");

  if (items.length) {
    if (!hasIO) {
      items.forEach(show);
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      items.forEach(function (el, i) {
        el.style.transitionDelay = i * 120 + "ms";
        io.observe(el);
      });
    }
  }

  // ------------------------------------------------------ trayectoria [data-aos]
  // El estado oculto (.page-aos) se aplica SOLO con IntersectionObserver;
  // sin soporte el contenido permanece visible.
  var aosItems = document.querySelectorAll("[data-aos]");

  if (aosItems.length) {
    if (!hasIO) {
      aosItems.forEach(show);
    } else {
      aosItems.forEach(function (el) {
        var delay = parseInt(el.getAttribute("data-aos-delay") || "0", 10) || 0;
        el.classList.add("page-aos");
        el.style.transitionDelay = delay + "ms";

        var obs = new IntersectionObserver(function (entries, o) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              show(entry.target);
              o.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
        obs.observe(el);
      });

      // Red de seguridad: lo que ya está en pantalla se muestra aunque el
      // observador falle por cambios de layout (imágenes, fuentes, nav).
      var vh = window.innerHeight || document.documentElement.clientHeight;
      function revealOnScreen() {
        aosItems.forEach(function (el) {
          if (el.classList.contains("is-visible")) return;
          var r = el.getBoundingClientRect();
          if (r.top < vh * 0.92 && r.bottom > 0) show(el);
        });
      }
      window.addEventListener("scroll", revealOnScreen, { passive: true });
      window.addEventListener("resize", revealOnScreen);
      setTimeout(revealOnScreen, 1200);
    }
  }
})();