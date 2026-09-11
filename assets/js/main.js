(() => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const mobile = window.matchMedia('(max-width: 760px)');
  const setMenu = (open, restoreFocus = false) => {
    document.body.classList.toggle('menu-open', open);
    menuToggle?.setAttribute('aria-expanded', String(open));
    if (restoreFocus) menuToggle?.focus();
  };
  menuToggle?.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  menu?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  mobile.addEventListener('change', () => setMenu(false));
  const currentPage = document.body.dataset.page;
  document.querySelectorAll('[data-menu] a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
  });
  document.querySelectorAll('[data-year]').forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  const rotatingWord = document.querySelector('[data-rotating-word]');
  if (rotatingWord) {
    const supportWords = ['seguridad', 'contabilidad', 'eficiencia', 'escalabilidad'];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const word = supportWords[wordIndex];
      if (!deleting) {
        charIndex = Math.min(charIndex + 1, word.length);
        rotatingWord.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          window.setTimeout(tick, 1500);
          return;
        }
        window.setTimeout(tick, 92);
        return;
      }

      charIndex = Math.max(charIndex - 1, 0);
      rotatingWord.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % supportWords.length;
        window.setTimeout(tick, 360);
        return;
      }
      window.setTimeout(tick, 52);
    };

    if (reducedMotion.matches) {
      rotatingWord.textContent = supportWords[0];
    } else {
      rotatingWord.textContent = '';
      window.setTimeout(tick, 280);
    }
  }

  const componentButtons = document.querySelectorAll('[data-component]');
  const componentPanels = document.querySelectorAll('[data-component-panel]');
  const selectComponent = (selected) => {
    componentButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.component === selected));
    });
    componentPanels.forEach((panel) => {
      panel.hidden = panel.dataset.componentPanel !== selected;
    });
  };
  componentButtons.forEach((button) => {
    button.addEventListener('click', () => selectComponent(button.dataset.component));
  });
  selectComponent('0');

  const chat = document.querySelector('#chat-panel');
  const chatToggle = document.querySelector('[data-chat-toggle]');
  const chatClose = document.querySelector('[data-chat-close]');
  const log = document.querySelector('.chat-log');
  let chatOpener = chatToggle;
  const setChat = (open, focus = false) => {
    if (!chat || !chatToggle) return;
    chat.hidden = !open;
    chatToggle.setAttribute('aria-expanded', String(open));
    if (focus) (open ? chatClose : chatOpener)?.focus();
  };
  const rememberDismissal = () => {
    try { sessionStorage.setItem('pulso-chat-dismissed', 'true'); } catch { /* Optional preference. */ }
  };
  chatToggle?.addEventListener('click', () => {
    chatOpener = chatToggle;
    if (!chat.hidden) rememberDismissal();
    setChat(chat.hidden, true);
  });
  chatClose?.addEventListener('click', () => {
    rememberDismissal();
    setChat(false, true);
  });
  document.querySelectorAll('[data-open-chat]').forEach((button) => {
    button.addEventListener('click', () => {
      chatOpener = button;
      setChat(true, true);
    });
  });
  let dismissed = false;
  try { dismissed = sessionStorage.getItem('pulso-chat-dismissed') === 'true'; } catch { /* Storage may be unavailable. */ }
  if (currentPage === 'index.html' && window.innerWidth >= 1280 && !dismissed) setChat(true);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (document.body.classList.contains('menu-open')) {
      setMenu(false, true);
    } else if (chat && !chat.hidden) {
      rememberDismissal();
      setChat(false, true);
    }
  });
  const appendMessage = (message, fromUser = false) => {
    if (!log) return;
    const bubble = document.createElement('p');
    bubble.className = 'chat-bubble' + (fromUser ? ' chat-bubble-user' : '');
    bubble.textContent = message;
    log.append(bubble);
    // Bound the local transcript without storing personal information.
    while (log.children.length > 20) log.firstElementChild.remove();
    log.scrollTop = log.scrollHeight;
  };
  const answers = {
    product: 'PULSO X1 es un concepto de cajero con pantalla de alto contraste, estructura reforzada y módulos diferenciados. En Nuestro producto puedes explorar cada componente.',
    installation: 'Imaginamos el X1 en comercios, oficinas y puntos de tránsito. Una instalación real requeriría evaluar espacio, accesibilidad, energía, conectividad y seguridad con el operador.',
    demo: 'Puedes recorrer la demostración en Nuestro producto: selecciona los puntos del cajero para conocer sus componentes. El X1 es ficticio; no hay operaciones bancarias ni unidades a la venta.',
  };
  document.querySelectorAll('[data-chat-topic]').forEach((button) => {
    button.addEventListener('click', () => {
      const answer = answers[button.dataset.chatTopic];
      if (!answer) return;
      appendMessage(button.textContent, true);
      appendMessage(answer);
    });
  });

  const whatsapp = document.querySelector('[data-whatsapp]');
  const number = String(window.PULSO_CONFIG?.whatsappNumber || '').trim();
  if (/^[1-9]\d{7,14}$/.test(number)) {
    whatsapp.href = `https://wa.me/${number}?text=${encodeURIComponent('Hola, me gustaría conocer más sobre PULSO X1.')}`;
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener noreferrer';
    document.querySelector('[data-whatsapp-label]').textContent = 'Continuar en WhatsApp';
    document.querySelector('[data-chat-disclaimer]').textContent = 'Se abrirá WhatsApp para continuar la conversación.';
    const status = document.querySelector('[data-contact-status]');
    if (status) status.textContent = 'Abre la guía de producto y selecciona Continuar en WhatsApp para contactar al equipo. Tú decides cuándo enviar el mensaje.';
  } else {
    whatsapp?.addEventListener('click', (event) => {
      event.preventDefault();
      appendMessage('WhatsApp aún no está habilitado en esta demo. Puedes usar las consultas rápidas o visitar Información para conocer el alcance del producto. No se ha enviado ningún mensaje.');
    });
  }
})();
