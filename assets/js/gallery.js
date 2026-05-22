function initGallery() {
  const map = {
    salon: [
      'images/salon/salon-11.jpeg',
      'images/salon/salon-10.jpeg',
      'images/salon/salon-14.jpeg',
      'images/salon/salon-18.jpeg',
      'images/salon/salon-2.jpeg'
    ],
    kuchnia: [
      'images/kuchnia/kuchnia-1.jpeg',
      'images/kuchnia/kuchnia-2.jpeg',
      'images/kuchnia/kuchnia-3.jpeg',
      'images/kuchnia/kuchnia-4.jpeg',
      'images/kuchnia/kuchnia-5.jpeg'
    ],
    przedpokoj: [
      'images/przedpokoj/przedpokoj-1.jpg',
      'images/przedpokoj/przedpokoj-2.jpg',
      'images/przedpokoj/przedpokoj-3.jpeg',
      'images/przedpokoj/balkon-2.jpg'
    ],
    duza_lazienka: [
      'images/duza_lazienka/duza_lazienka-1.jpg',
      'images/duza_lazienka/duza_lazienka-2.jpg',
      'images/duza_lazienka/duza_lazienka-3.jpg',
      'images/duza_lazienka/duza_lazienka-4.jpg'
    ],
    toaleta: [
      'images/toaleta/toaleta-1.jpeg',
      'images/toaleta/toaleta-2.jpeg',
      'images/toaleta/toaleta-3.jpeg',
      'images/toaleta/toaleta-4.jpeg'
    ],
    sypialnia: [
      'images/sypialnia/sypialnia-1.jpg',
      'images/sypialnia/sypialnia-3.jpg',
      'images/sypialnia/sypialnia-7.jpg',
      'images/sypialnia/sypialnia-8.jpg'
    ],
    drugi_pokoj: [
      'images/drugi_pokoj/maly_pokoj-1.jpg',
      'images/drugi_pokoj/maly_pokoj-3.jpg',
      'images/drugi_pokoj/maly_pokoj-4.jpg',
      'images/drugi_pokoj/maly_pokoj-5.jpg'
    ]
  };

  const openLightbox = (src, alt) => {
    const overlay = document.getElementById('lightboxOverlay');
    const image = document.getElementById('lightboxImage');
    if (!overlay || !image) return;
    image.src = src;
    image.alt = alt;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    const overlay = document.getElementById('lightboxOverlay');
    const image = document.getElementById('lightboxImage');
    if (!overlay || !image) return;
    overlay.style.display = 'none';
    image.src = '';
    document.body.style.overflow = '';
  };

  const overlay = document.getElementById('lightboxOverlay');
  const closeButton = document.getElementById('lightboxClose');
  overlay?.addEventListener('click', (event) => {
    if (event.target === overlay) closeLightbox();
  });
  closeButton?.addEventListener('click', closeLightbox);

  document.querySelectorAll('.content-section').forEach((section) => {
    const id = section.id;
    const stage = section.querySelector('.subgallery-stage');
    const prev = section.querySelector('[data-prev]');
    const next = section.querySelector('[data-next]');
    if (!id || !stage || !prev || !next || !map[id]) return;

    const images = map[id];
    let idx = 0;

    stage.innerHTML = images.map((src, i) => `
      <div class="subslide${i === 0 ? ' active' : ''}">
        <img loading="lazy" decoding="async" src="${src}" alt="${id} ${i + 1}" data-lightbox>
      </div>
    `).join('');

    const slides = () => stage.querySelectorAll('.subslide');

    const render = (n) => {
      idx = (n + images.length) % images.length;
      slides().forEach((s, i) => s.classList.toggle('active', i === idx));
    };

    stage.addEventListener('click', (event) => {
      const img = event.target.closest('img');
      if (!img) return;
      openLightbox(img.src, img.alt);
    });

    prev.addEventListener('click', () => render(idx - 1));
    next.addEventListener('click', () => render(idx + 1));
  });

  document.querySelectorAll('.room-tile').forEach((tile) => {
    const imageElement = tile.querySelector('.room-image');
    const labelElement = tile.querySelector('.tile-label');
    const bg = imageElement?.style.backgroundImage || '';
    const match = bg.match(/url\(["']?(.*?)["']?\)/);
    const src = match ? match[1] : '';
    const alt = labelElement?.textContent.trim() || '';
    if (!src) return;

    tile.style.cursor = 'zoom-in';
    tile.addEventListener('click', (event) => {
      if (event.target.closest('.tile-arrow')) return;
      event.preventDefault();
      openLightbox(src, alt);
    });
  });

}

if (document.querySelector('[data-include]')) {
  document.addEventListener('includes:loaded', initGallery);
} else {
  document.addEventListener('DOMContentLoaded', initGallery);
}