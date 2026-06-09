/* ── NAV ACTIVE STATE ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.25 });
sections.forEach(s => io.observe(s));

/* ── TEMPLATE TABS ── */
function switchTab(el, group) {
  const parent = el.closest('.message-templates');
  parent.querySelectorAll('.template-tab').forEach(t => t.classList.remove('active'));
  parent.querySelectorAll('.template-content').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  const target = parent.querySelector('#' + group);
  if (target) target.classList.add('active');
}

/* ── COPY BUTTON ── */
document.addEventListener('click', e => {
  if (e.target.classList.contains('copy-btn')) {
    const box   = e.target.closest('.message-box');
    const text  = box.innerText.replace('COPY', '').trim();
    navigator.clipboard.writeText(text).then(() => {
      const orig = e.target.textContent;
      e.target.textContent = 'Copied!';
      setTimeout(() => { e.target.textContent = orig; }, 1600);
    });
  }
});

/* ── SMOOTH JUMP NAV ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── TIER CARD ACTIVE ── */
document.querySelectorAll('.tier-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.tier-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});
