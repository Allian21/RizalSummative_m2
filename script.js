/* ============================================================
   José Rizal — Character Development
   script.js
   ============================================================ */

// ── SCROLL PROGRESS & NAVBAR ──────────────────────────────────
const progressBar = document.getElementById('progress-bar');
const backTop     = document.getElementById('back-top');
const navbar      = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const scrollTop   = window.pageYOffset;
  const docHeight   = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';

  // Back-to-top button visibility
  if (scrollTop > 400) backTop.classList.add('visible');
  else                 backTop.classList.remove('visible');

  // Navbar shadow on scroll
  if (scrollTop > 50) navbar.classList.add('scrolled');
  else                navbar.classList.remove('scrolled');
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── HAMBURGER MENU ────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

// Close mobile menu when any nav link is clicked
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () =>
    document.getElementById('nav-links').classList.remove('open')
  );
});

// ── INTERSECTION OBSERVER (fade-in on scroll) ─────────────────
const observerOptions = {
  threshold:   0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
  observer.observe(el);
});

// ── ENVIRONMENT TABS ──────────────────────────────────────────
function showTab(id) {
  document.querySelectorAll('.env-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.env-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  event.target.classList.add('active');
}

// ── QUOTE CAROUSEL ────────────────────────────────────────────
const slides        = document.querySelectorAll('.quote-slide');
const dotsContainer = document.getElementById('quote-dots');
let currentSlide  = 0;
let quoteInterval;

// Build navigation dots dynamically
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'quote-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Go to quote ' + (i + 1));
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  document.querySelectorAll('.quote-dot')[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  document.querySelectorAll('.quote-dot')[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }

// Auto-advance every 5 seconds
quoteInterval = setInterval(nextSlide, 5000);

// Pause auto-advance on hover
const carousel = document.querySelector('.quote-carousel');
carousel.addEventListener('mouseenter', () => clearInterval(quoteInterval));
carousel.addEventListener('mouseleave', () => {
  quoteInterval = setInterval(nextSlide, 5000);
});

// ── STAGGER ANIMATION DELAY for grid cards ────────────────────
document.querySelectorAll('.traits-grid .trait-card, .challenges-grid .challenge-card')
  .forEach((card, i) => {
    card.style.transitionDelay = (i * 0.1) + 's';
  });
