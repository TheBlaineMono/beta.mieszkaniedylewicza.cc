document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const prev = document.getElementById('prevSlide');
  const next = document.getElementById('nextSlide');
  let current = 0;

  const show = (i) => {
    if (!slides.length) return;
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    current = i;
  };

  if (slides.length) {
    show(0);
    prev?.addEventListener('click', () => show((current - 1 + slides.length) % slides.length));
    next?.addEventListener('click', () => show((current + 1) % slides.length));
    setInterval(() => show((current + 1) % slides.length), 4500);
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const closeMobileMenu = () => {
    if (!menu || !menuToggle) return;
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  document.querySelectorAll('.menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileMenu();
    });
  });

  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    menu?.classList.toggle('open', !expanded);
  });

  const links = [...document.querySelectorAll('.menu a[href^="#"]')];
  const sections = links.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  if (links.length && sections.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      });
    }, { root: null, threshold: 0.35 });
    sections.forEach(sec => obs.observe(sec));
  }

  const topbar = document.querySelector('.topbar');
  const setTopbar = () => topbar?.classList.toggle('scrolled', window.scrollY > 8);
  setTopbar();
  window.addEventListener('scroll', setTopbar, { passive: true });

  const overlay = document.getElementById('lightboxOverlay');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeBtn = document.getElementById('lightboxClose');
  let lastFocusedElement = null;

  const closeLightbox = () => {
    if (!overlay) return;
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocusedElement?.focus();
  };

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', (event) => {
      if (!overlay || !lightboxImage) return;
      event.preventDefault();
      lastFocusedElement = event.currentTarget;
      lightboxImage.src = el.currentSrc || el.src || el.dataset.src || '';
      lightboxImage.alt = el.alt || '';
      overlay.style.display = 'flex';
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn?.focus();
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
  const menuToggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('pageMenu');

menuToggle?.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});
});
