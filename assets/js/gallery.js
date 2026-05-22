document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.subgallery-slider').forEach((slider) => {
    const stage = slider.querySelector('.subgallery-stage');
    const prev = slider.querySelector('[data-prev]');
    const next = slider.querySelector('[data-next]');
    const slides = stage ? Array.from(stage.querySelectorAll('.subslide')) : [];

    if (!stage || slides.length === 0) return;

    let idx = slides.findIndex((slide) => slide.classList.contains('active'));
    if (idx < 0) idx = 0;

    const render = (n) => {
      idx = (n + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === idx));
    };

    prev?.addEventListener('click', () => render(idx - 1));
    next?.addEventListener('click', () => render(idx + 1));
  });
});
