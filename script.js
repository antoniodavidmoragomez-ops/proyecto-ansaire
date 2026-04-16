// ===========================
// HEADER SCROLL
// ===========================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===========================
// BURGER MENU
// ===========================
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

// Close nav when link clicked
nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===========================
// SCROLL REVEAL
// ===========================
function addRevealClasses() {
  const elements = document.querySelectorAll(
    '.service-card, .stat-item, .project-card, .testimonial-card, .value-item, .contact-item, .about-content > *, .section-header'
  );
  elements.forEach(el => el.classList.add('reveal'));
}

function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

addRevealClasses();
window.addEventListener('scroll', revealOnScroll, { passive: true });
revealOnScroll(); // run on load

// ===========================
// STAGGER REVEAL (service cards, stats)
// ===========================
function staggerCards() {
  document.querySelectorAll('.services-grid .service-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
  });
  document.querySelectorAll('.stats-grid .stat-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 100}ms`;
  });
  document.querySelectorAll('.testimonials-grid .testimonial-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 100}ms`;
  });
}
staggerCards();

// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  btn.textContent = 'Enviando...';
  btn.disabled = true;

  // Simulate submission (replace with real backend/EmailJS/formspree)
  setTimeout(() => {
    btn.textContent = '¡Mensaje enviado!';
    btn.style.background = '#22c55e';
    btn.style.borderColor = '#22c55e';

    // Reset after 3s
    setTimeout(() => {
      contactForm.reset();
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 3000);
  }, 1200);
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}, { passive: true });
