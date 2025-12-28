/* =====================
   PROJECT SLIDER
===================== */

const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.featured-project');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;

if (track && slides.length && nextBtn && prevBtn) {

  function updateButtons() {
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;
  }

  function showSlide(i) {
    track.style.transform = `translateX(-${i * 100}%)`;
    updateButtons();
  }

  nextBtn.addEventListener('click', () => {
    if (index < slides.length - 1) {
      index++;
      showSlide(index);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      showSlide(index);
    }
  });

  let startX = 0;

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50 && index < slides.length - 1) index++;
    if (diff < -50 && index > 0) index--;

    showSlide(index);
  });

  updateButtons();
}

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
