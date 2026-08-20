// ===================================================
// 1. OUVERTURE DE L'ENVELOPPE
// ===================================================
const envelope = document.getElementById('envelope');
const envelopeScreen = document.getElementById('envelope-screen');
const mainContent = document.getElementById('main-content');

envelope.addEventListener('click', openEnvelope);

function openEnvelope() {
  envelope.classList.add('opening');

  // On laisse le temps à l'animation du rabat de se jouer
  setTimeout(() => {
    envelopeScreen.classList.add('hidden');
    mainContent.hidden = false;
    document.body.style.overflow = 'auto';
    startReveals();
  }, 650);
}

// Empêche le scroll tant que l'enveloppe n'est pas ouverte
document.body.style.overflow = 'hidden';

// ===================================================
// 2. AMBIANCE — cœurs et étoiles flottants (discrets)
// ===================================================
const ambient = document.getElementById('ambient');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  const symbols = ['♥', '♥', '✦'];
  const TOTAL_PARTICLES = 10; // reste volontairement discret

  for (let i = 0; i < TOTAL_PARTICLES; i++) {
    const el = document.createElement('span');
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    el.textContent = symbol;
    el.className = 'ambient-item' + (symbol === '✦' ? ' star' : '');
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    el.style.animationDuration = (10 + Math.random() * 10) + 's';
    el.style.animationDelay = (Math.random() * 12) + 's';
    ambient.appendChild(el);
  }
}

// ===================================================
// 3. RÉVÉLATION AU SCROLL
// ===================================================
function startReveals() {
  const items = document.querySelectorAll('.reveal');

  if (reduceMotion) {
    items.forEach(item => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));
}
