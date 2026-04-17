document.addEventListener('DOMContentLoaded', () => {

  /* ── CURSOR ────────────────────────────────────────── */
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mx = -100, my = -100, cx = -100, cy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
    document.body.classList.add('cursor-ready');
  });

  const animateCursor = () => {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  document.querySelectorAll('a, button, .g-item, .s-card, .feature, .c-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.8)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
  });

  /* ── NAV SCROLL ────────────────────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── BURGER ────────────────────────────────────────── */
  const burger    = document.getElementById('burger');
  const navLinks  = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── SMOOTH SCROLL ─────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── SCROLL REVEAL ─────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale');
  const observer  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('revealed'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* Hero — trigger immediately */
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-fade').forEach(el => {
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('revealed'), delay);
  });

  /* ── COUNTER ANIMATION ─────────────────────────────── */
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target);
      const dur    = 1800;
      const start  = performance.now();

      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / dur, 1);
        const ease     = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.round(ease * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));

  /* ── FORM FLOATING LABELS ──────────────────────────── */
  const selects = document.querySelectorAll('.form-select-wrap select');
  selects.forEach(sel => {
    sel.addEventListener('change', () => {
      sel.closest('.form-select-wrap').classList.toggle('has-val', sel.value !== '');
    });
  });

  /* ── FORM SUBMIT ───────────────────────────────────── */
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const { nombre, telefono, email, servicio, mensaje } = form;
    const subject = encodeURIComponent(`Solicitud de presupuesto — ${nombre.value.trim()}`);
    const body    = encodeURIComponent(
      `Nombre: ${nombre.value.trim()}\nTeléfono: ${telefono.value.trim()}\nEmail: ${email.value.trim()}\nServicio: ${servicio.value}\n\nProyecto:\n${mensaje.value.trim()}`
    );
    window.location.href = `mailto:antoniodavidmoragomez@gmail.com?subject=${subject}&body=${body}`;
  });

  /* ── FOOTER YEAR ───────────────────────────────────── */
  document.getElementById('year').textContent = new Date().getFullYear();

});
