(function () {
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  function showAll() {
    items.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (!("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach(function (el, i) {
    el.style.transitionDelay = i * 120 + "ms";
    io.observe(el);
  });

  // Efecto sutil al redimensionar la ventana (se reajusta todo)
  var hero = document.querySelector("main.hero");
  if (hero) {
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        hero.classList.remove("is-adjusting");
        void hero.offsetWidth; // reinicia la animación
        hero.classList.add("is-adjusting");
      }, 220);
    });
  }
})();