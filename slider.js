/* =====================
   SCROLL-SCRUB WORD REVEAL
===================== */

const aboutText = document.querySelector('.reveal-words');

if (aboutText) {
  const words = aboutText.innerText.split(' ');
  aboutText.innerHTML = words
    .map(word => `<span>${word}&nbsp;</span>`)
    .join('');

  const spans = aboutText.querySelectorAll('span');

  function scrubReveal() {
  const rect = aboutText.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // start earlier, end later → full paragraph reveals
  const start = windowHeight * 0.85;
  const end = -rect.height * 0.15;

  const progress = Math.min(
    Math.max((start - rect.top) / (start - end), 0),
    1
  );

  const visibleCount = Math.floor(progress * spans.length);

  spans.forEach((span, index) => {
    span.classList.toggle('visible', index < visibleCount);
  });
}


  window.addEventListener('scroll', scrubReveal);
  scrubReveal();
}
