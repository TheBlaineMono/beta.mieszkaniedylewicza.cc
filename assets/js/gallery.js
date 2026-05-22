function initRoomGallery(roomId) {
  const section = document.getElementById(roomId);
  if (!section) return;

  const stage = section.querySelector('.subgallery-stage');
  const prev = section.querySelector('[data-prev]');
  const next = section.querySelector('[data-next]');
  const imgs = roomImages[roomId] || [];

  if (!stage || !imgs.length) return;

  stage.innerHTML = imgs.map((src, i) => `
    <div class="subslide${i === 0 ? ' active' : ''}">
      <img src="${src}" alt="${roomId} ${i + 1}" loading="lazy">
    </div>
  `).join('');

  let idx = 0;
  const slides = () => stage.querySelectorAll('.subslide');

  const render = (n) => {
    idx = (n + imgs.length) % imgs.length;
    slides().forEach((el, i) => el.classList.toggle('active', i === idx));
  };

  prev?.addEventListener('click', () => render(idx - 1));
  next?.addEventListener('click', () => render(idx + 1));
}

document.addEventListener('DOMContentLoaded', () => {
  Object.keys(roomImages).forEach(initRoomGallery);
});