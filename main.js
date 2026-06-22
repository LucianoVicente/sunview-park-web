/* =====================================================================
   SUNVIEW PARK ADVENTURE — JavaScript principal (vanilla, sin librerías)
   ---------------------------------------------------------------------
   1. Menú móvil (hamburguesa)
   2. Sombra del navbar al hacer scroll
   3. Reveal de elementos al entrar en pantalla (IntersectionObserver)
   4. Año dinámico en el footer
   5. Validación + feedback del formulario de contacto
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Menú móvil ---------- */
  const toggle = document.querySelector('.navbar__toggle');
  const links  = document.querySelector('.navbar__links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const open = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Cierra el menú al pulsar un enlace (mejora la navegación en móvil)
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. Sombra reforzada del navbar al hacer scroll ---------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = function () {
      if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 8px 26px rgba(15, 39, 66, 0.16)';
      } else {
        navbar.style.boxShadow = '';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 3. Reveal al hacer scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: si no hay soporte, mostramos todo directamente
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 4. Año dinámico en el footer ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---------- 5. Formulario de contacto ---------- */
  const form = document.querySelector('#contact-form');
  if (form) {
    const feedback = form.querySelector('.form-feedback');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validación nativa del navegador
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Aquí se conectaría con el backend / servicio de email.
      // Como la web es estática, mostramos confirmación visual.
      if (feedback) {
        feedback.classList.add('is-visible');
        feedback.textContent = '¡Gracias! Hemos recibido tu mensaje. Te responderemos lo antes posible.';
      }
      form.reset();

      // Oculta el mensaje tras unos segundos
      setTimeout(function () {
        if (feedback) feedback.classList.remove('is-visible');
      }, 6000);
    });
  }

});
