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

  const whatsapp = document.createElement('a');
  whatsapp.className = 'whatsapp-float';
  whatsapp.href = 'https://wa.me/51922744688';
  whatsapp.target = '_blank';
  whatsapp.rel = 'noopener noreferrer';
  whatsapp.setAttribute('aria-label', 'Escríbenos por WhatsApp');
  whatsapp.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.2a12.5 12.5 0 0 0-10.7 19l-1.7 6.6 6.8-1.7A12.5 12.5 0 1 0 16 3.2Zm0 22.7c-1.8 0-3.5-.5-5-1.4l-.4-.2-4 .9 1-3.8-.3-.4A9.5 9.5 0 1 1 16 25.9Zm5.2-7.1c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1a7.8 7.8 0 0 1-2.3-1.4 8.7 8.7 0 0 1-1.6-2c-.2-.3 0-.4.1-.6l.4-.5c.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.6-.5-.8-.5h-.7c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 3 1.1 3.2c.1.2 2 3.1 4.9 4.3.7.3 1.2.4 1.7.5.7.2 1.4.1 1.9.1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z" fill="currentColor"/></svg>';
  document.body.append(whatsapp);

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
