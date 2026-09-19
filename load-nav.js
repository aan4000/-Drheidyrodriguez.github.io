// La barra de navegación ya está incrustada estáticamente en cada página
// (dentro de #nav-container). Aquí solo se activan: menú responsive,
// scroll compacto y funcionalidad del drawer móvil.

// La barra se compacta al hacer scroll (clase "scrolled")
function initNavScroll() {
  const navEl = document.getElementById('respNav');
  if (!navEl) return;
  const update = () => navEl.classList.toggle('scrolled', window.scrollY > 10);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initResponsiveMenu() {
  const resMenu = document.getElementById('resMenu');
  const respNav = document.getElementById('respNav');
  const closeBtn = document.getElementById('close');

  if (resMenu && respNav) {
    resMenu.addEventListener('click', () => {
      respNav.classList.add('showMe');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && respNav) {
    closeBtn.addEventListener('click', () => {
      respNav.classList.remove('showMe');
      document.body.style.overflow = '';
    });
  }

  // Cerrar al hacer click fuera del menú
  if (respNav) {
    respNav.addEventListener('click', (e) => {
      if (e.target === respNav) {
        respNav.classList.remove('showMe');
        document.body.style.overflow = '';
      }
    });
  }

  // Submenús en móvil
  document.querySelectorAll('.resp_mobile .tiene-submenu > a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = link.parentElement;
      parent.classList.toggle('open');
    });
  });
}

(function () {
  if (document.getElementById('respNav')) {
    initResponsiveMenu();
    initNavScroll();
  }
})();