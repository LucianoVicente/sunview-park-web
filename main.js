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

  /* ---------- 6. Contador animado de las cifras del hero ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (counters.length && !prefersReduced) {
    const locale = (document.documentElement.lang || 'es').toLowerCase().indexOf('en') === 0 ? 'en-GB' : 'es-ES';
    counters.forEach(function (el) {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      if (isNaN(target)) return;
      el.textContent = '0' + suffix;
      const duration = 1300;
      let startTime = null;
      const run = function (now) {
        if (startTime === null) startTime = now;
        const t = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString(locale) + suffix;
        if (t < 1) { requestAnimationFrame(run); }
        else { el.textContent = target.toLocaleString(locale) + suffix; }
      };
      setTimeout(function () { requestAnimationFrame(run); }, 600);
    });
  }

  /* ---------- 7. Tirolinas que descienden por el cable al hacer scroll (solo inicio) ---------- */
  const riderL = document.querySelector('.hero__rider--l');
  const riderR = document.querySelector('.hero__rider--r');
  const heroHome = document.querySelector('.hero--home');
  if (riderL && riderR && heroHome && !prefersReduced && window.innerWidth > 600) {
    const maxDown = 64;        // px que descienden como máximo
    const slope = 0.647;       // ángulo del cable (dx por cada dy)
    let ticking = false;
    const apply = function () {
      const rect = heroHome.getBoundingClientRect();
      const h = rect.height || 1;
      let p = -rect.top / h;                       // 0 arriba del todo, 1 al salir el hero
      if (p < 0) { p = 0; } else if (p > 1) { p = 1; }
      const dy = p * maxDown;
      const dx = slope * dy;
      riderL.style.transform = 'translate(' + (-dx).toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      riderR.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      ticking = false;
    };
    const onScrollR = function () { if (!ticking) { window.requestAnimationFrame(apply); ticking = true; } };
    window.addEventListener('scroll', onScrollR, { passive: true });
    window.addEventListener('resize', onScrollR, { passive: true });
    apply();
  }

});
