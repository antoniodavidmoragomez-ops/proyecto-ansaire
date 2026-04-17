document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const telefono = form.telefono.value.trim();
    const servicio = form.servicio.value;
    const mensaje = form.mensaje.value.trim();

    const subject = encodeURIComponent(`Solicitud de presupuesto - ${nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nTeléfono: ${telefono}\nEmail: ${email}\nServicio: ${servicio}\n\nMensaje:\n${mensaje}`
    );
    window.location.href = `mailto:antoniodavidmoragomez@gmail.com?subject=${subject}&body=${body}`;
  });
});
