/* ========= Mobile Navigation ========= */
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('#primary-nav');

function setNav(open) {
  if (!navToggle || !primaryNav) return;
  navToggle.setAttribute('aria-expanded', String(open));
  if (open) {
    primaryNav.removeAttribute('hidden');
    // simple focus management
    const firstLink = primaryNav.querySelector('a');
    if (firstLink) firstLink.focus({ preventScroll: true });
    document.body.style.overflow = 'hidden'; // prevent background scroll on mobile
  } else {
    primaryNav.setAttribute('hidden', '');
    document.body.style.overflow = '';
    navToggle.focus({ preventScroll: true });
  }
}

if (navToggle && primaryNav) {
  // initialize collapsed on mobile
  if (window.matchMedia('(max-width: 1023.98px)').matches) {
    primaryNav.setAttribute('hidden', '');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    setNav(!isOpen);
  });

  // Close menu on link click (mobile)
  primaryNav.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('a.nav-link')) {
      if (window.matchMedia('(max-width: 1023.98px)').matches) setNav(false);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      setNav(false);
    }
  });

  // Reset state on resize between breakpoints
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      primaryNav.removeAttribute('hidden');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else if (navToggle.getAttribute('aria-expanded') === 'false') {
      primaryNav.setAttribute('hidden', '');
    }
  });
}

/* ========= Testimonials Slider ========= */
const track = document.querySelector('.testimonial__track');
const slides = Array.from(document.querySelectorAll('.testimonial__slide'));
const prevBtn = document.querySelector('.control.prev');
const nextBtn = document.querySelector('.control.next');
const dots = Array.from(document.querySelectorAll('.dot'));

let current = 0;
const total = slides.length;

function goToSlide(index) {
  current = (index + total) % total;
  const offset = -current * 100;
  track.style.transform = `translateX(${offset}%)`;
  dots.forEach((d, i) => {
    d.classList.toggle('is-active', i === current);
    d.setAttribute('aria-selected', i === current ? 'true' : 'false');
    d.tabIndex = i === current ? 0 : -1;
  });
}

if (track && slides.length) {
  goToSlide(0);

  nextBtn?.addEventListener('click', () => goToSlide(current + 1));
  prevBtn?.addEventListener('click', () => goToSlide(current - 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToSlide(i);
      }
    });
  });

  // Optional: autoplay pause on hover
  let auto = setInterval(() => goToSlide(current + 1), 6000);
  const shell = document.querySelector('.testimonial__shell');
  shell?.addEventListener('mouseenter', () => clearInterval(auto));
  shell?.addEventListener('mouseleave', () => {
    auto = setInterval(() => goToSlide(current + 1), 6000);
  });
}