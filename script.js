const header = document.querySelector('[data-header]');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const menuQuery = window.matchMedia('(max-width: 1050px)');

const closeMenu = (returnFocus = false) => {
  nav.classList.remove('open');
  toggle.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  document.body.classList.remove('menu-open');
  nav.inert = menuQuery.matches;
  if (returnFocus) toggle.focus();
};

toggle.addEventListener('click', () => {
  const open = !nav.classList.contains('open');
  nav.inert = !open;
  nav.classList.toggle('open', open);
  toggle.classList.toggle('active', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('menu-open', open);
});
navLinks.forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu(true);
  if (event.key !== 'Tab' || !nav.classList.contains('open')) return;
  const focusable = [...nav.querySelectorAll('a[href], button:not([disabled])')];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
menuQuery.addEventListener('change', () => closeMenu());
nav.inert = menuQuery.matches;

const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const revealElements = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${entry.target.dataset.delay || 0}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('visible'));
}

const sections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55%' });
  sections.forEach(section => sectionObserver.observe(section));
}

const form = document.querySelector('#inquiry-form');
const required = [...form.querySelectorAll('[required]')];
required.forEach(field => field.addEventListener('input', () => {
  field.classList.remove('invalid');
  const error = field.parentElement.querySelector('.field-error');
  if (error) error.textContent = '';
}));

form.addEventListener('submit', event => {
  event.preventDefault();
  let valid = true;
  required.forEach(field => {
    const passes = field.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()) : field.value.trim().length > 0;
    field.classList.toggle('invalid', !passes);
    const error = field.parentElement.querySelector('.field-error');
    if (error) error.textContent = passes ? '' : (field.type === 'email' ? 'Please enter a valid email address.' : 'Please complete this field.');
    if (!passes) valid = false;
  });
  if (!valid) {
    form.querySelector('.invalid').focus();
    form.querySelector('.form-status').textContent = 'Please check the highlighted fields.';
    return;
  }
  const data = new FormData(form);
  const subject = `Business problem brief — ${data.get('company') || data.get('name')}`;
  const body = [
    `Name: ${data.get('name')}`,
    `Company / Business: ${data.get('company') || 'Not provided'}`,
    `Email: ${data.get('email')}`,
    '',
    'What is not working as well as it should?', data.get('problem'),
    '',
    'How are you handling it today?', data.get('current') || 'Not provided',
    '',
    'What would a better result look like?', data.get('outcome') || 'Not provided',
    '',
    'How important is this right now?', data.get('priority')
  ].join('\n');
  window.location.href = `mailto:info@detleng.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  form.querySelector('.form-status').textContent = 'Your email app is opening with your inquiry ready to review and send.';
});

document.querySelector('#year').textContent = new Date().getFullYear();
