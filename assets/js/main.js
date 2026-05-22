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

  document.querySelectorAll('.menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      const overlay = document.getElementById('lightboxOverlay');
      const img = document.getElementById('lightboxImage');
      if (!overlay || !img) return;
      img.src = el.currentSrc || el.src || el.dataset.src || '';
      img.alt = el.alt || '';
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  const overlay = document.getElementById('lightboxOverlay');
  const closeBtn = document.getElementById('lightboxClose');
  const close = () => {
    if (!overlay) return;
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  };
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
});
