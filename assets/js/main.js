(() => {
  const body = document.body;
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('#site-nav');
  const currentPage = body.dataset.page;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelector(`[data-nav="${currentPage}"]`)?.setAttribute('aria-current', 'page');
  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

  const closeMenu = () => {
    body.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
  };

  toggle?.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  const header = document.querySelector('[data-header]');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const reveals = [...document.querySelectorAll('.reveal')];
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach((item) => observer.observe(item));
  }
})();
