// carousel.js — Acompañante de las flechas del carrusel de la galería
// En desktop (>=900px) las flechas están ocultas y la galería se ve completa.
// En móvil (<=900px) .bottom_section se convierte en un carrusel horizontal
// con scroll-snap, y estas flechas desplazan el scroll (scrollBy) una tarjeta.
(function () {
  const section = document.querySelector(".bottom_section");
  if (!section) return;

  const prevBtn = section.querySelector(".carousel-btn--prev");
  const nextBtn = section.querySelector(".carousel-btn--next");
  if (!prevBtn || !nextBtn) return;

  const CARD_GAP = 16;

  function scrollByCards(dir) {
    const card = section.querySelector(".bottom_section .card");
    const amount = card ? card.offsetWidth + CARD_GAP : window.innerWidth;
    section.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  prevBtn.addEventListener("click", () => scrollByCards(-1));
  nextBtn.addEventListener("click", () => scrollByCards(1));
})();