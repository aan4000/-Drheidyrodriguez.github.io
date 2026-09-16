// carousel.js — Acompañante del "carrusel" de la galería en móvil
// .bottom_section es el contenedor con overflow-x: auto y scroll-snap.
// Las flechas "mueven" el scroll y aparecen siempre en ambos lados.

(function() {
  const container = document.querySelector('.bottom_section');
  const prevBtn = document.querySelector('.carousel-btn--prev');
  const nextBtn = document.querySelector('.carousel-btn--next');
  if (!container || !prevBtn || !nextBtn) return;

  const cards = Array.from(container.querySelectorAll('.card'));
  if (!cards.length) return;

  const clickCard = cards[0];

  function step() {
    const w = clickCard.getBoundingClientRect().width;
    return w + 16; // 8px de margen a cada lado
  }

  prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -step(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: step(), behavior: 'smooth' });
  });
})();