document.addEventListener('DOMContentLoaded', () => {

  const reduced     = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

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

  /* ── PRELOADER ─────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  const countEl   = document.getElementById('preloaderCount');

  const startHero = () => {
    document.querySelectorAll('.hero .reveal-up, .hero .reveal-fade').forEach(el => {
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('revealed'), delay);
    });
  };

  let preloaderDone = false;
  const finishPreloader = () => {
    if (preloaderDone) return;
    preloaderDone = true;
    countEl.textContent = '100';
    preloader.classList.add('done');
    document.body.classList.add('loaded');
    setTimeout(startHero, 550);
    setTimeout(() => { preloader.style.display = 'none'; }, 1800);
  };

  if (reduced || !preloader) {
    if (preloader) preloader.style.display = 'none';
    document.body.classList.add('loaded');
    startHero();
  } else {
    let pageLoaded = false;
    window.addEventListener('load', () => { pageLoaded = true; });
    let progress = 0;
    const t0 = performance.now();
    const tick = (now) => {
      if (preloaderDone) return;
      const cap = pageLoaded ? 100 : 90;
      progress += (cap - progress) * 0.055;
      countEl.textContent = Math.floor(progress);
      if (pageLoaded && progress > 99 && now - t0 > 1200) { finishPreloader(); return; }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    setTimeout(finishPreloader, 4500); /* la web nunca se queda bloqueada en el preloader */
  }

  /* ── HERO VIDEO (fallback automático a hero.png) ───── */
  const hero      = document.querySelector('.hero');
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo && !reduced) {
    heroVideo.addEventListener('canplay', () => {
      hero.classList.add('video-ready');
      heroVideo.play().catch(() => {});
    });
    heroVideo.load();
  }

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

  /* ── SCROLL CON INERCIA (solo puntero fino) ────────── */
  const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;
  let lerpActive  = false;
  let targetY     = window.scrollY;
  let currentY    = targetY;
  let lastApplied = targetY;

  if (finePointer && !reduced) {
    lerpActive = true;
    window.addEventListener('wheel', e => {
      if (navLinks.classList.contains('open')) return;
      e.preventDefault();
      const mult = e.deltaMode === 1 ? 16 : 1;
      targetY = Math.max(0, Math.min(targetY + e.deltaY * mult, maxScroll()));
    }, { passive: false });

    /* scroll externo (teclado, barra): resincronizar */
    window.addEventListener('scroll', () => {
      if (Math.abs(window.scrollY - lastApplied) > 2) {
        targetY = currentY = lastApplied = window.scrollY;
      }
    }, { passive: true });
  }

  /* ── ANCLAS ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (lerpActive) {
        targetY = Math.max(0, Math.min(target.getBoundingClientRect().top + window.scrollY - 72, maxScroll()));
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── BUCLE MAESTRO: lerp, parallax, barra progreso ─── */
  const heroBg      = document.querySelector('.hero-bg');
  const heroContent = document.querySelector('.hero-content');
  const progressBar = document.getElementById('scrollProgress');
  const parallaxEls = [...document.querySelectorAll('[data-parallax]')];

  const loop = () => {
    if (lerpActive && Math.abs(targetY - currentY) > 0.5) {
      currentY += (targetY - currentY) * 0.09;
      lastApplied = Math.round(currentY);
      window.scrollTo({ top: lastApplied, left: 0, behavior: 'instant' });
    }

    const y  = window.scrollY;
    const vh = window.innerHeight;

    if (!reduced) {
      if (y <= vh) {
        heroBg.style.transform      = `translate3d(0, ${(y * 0.18).toFixed(1)}px, 0)`;
        heroContent.style.transform = `translate3d(0, ${(y * 0.28).toFixed(1)}px, 0)`;
        heroContent.style.opacity   = Math.max(1 - y / (vh * 0.85), 0).toFixed(3);
      }
      parallaxEls.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const speed  = parseFloat(el.dataset.parallax);
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.12)`;
      });
    }

    const p = maxScroll() > 0 ? y / maxScroll() : 0;
    progressBar.style.transform = `scaleX(${p.toFixed(4)})`;

    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  /* ── BOTONES MAGNÉTICOS ────────────────────────────── */
  if (finePointer && !reduced) {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const yb = (e.clientY - r.top - r.height / 2) * 0.4;
        btn.style.transform = `translate(${x.toFixed(1)}px, ${yb.toFixed(1)}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

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

  /* los del hero los dispara startHero() al abrirse el preloader */
  revealEls.forEach(el => { if (!el.closest('.hero')) observer.observe(el); });

  /* ── MARCADORES DE SECCIÓN ─────────────────────────── */
  const markerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('marker-in');
      markerObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('section').forEach(s => {
    if (s.querySelector('.sec-marker')) markerObserver.observe(s);
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
