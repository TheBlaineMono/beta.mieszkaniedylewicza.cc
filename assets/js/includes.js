document.addEventListener('DOMContentLoaded', async () => {
  const blocks = document.querySelectorAll('[data-include]');
  for (const block of blocks) {
    const src = block.getAttribute('data-include');
    if (!src) continue;
    const res = await fetch(src);
    block.innerHTML = await res.text();
  }
});