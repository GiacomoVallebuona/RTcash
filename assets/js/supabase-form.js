import { buildLeadPayload, validateLead } from './form-core.mjs';

const form = document.querySelector('[data-quote-form]');

if (form) {
  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('button[type="submit"]');
  const label = form.querySelector('[data-submit-label]');

  const showErrors = (errors) => {
    form.querySelectorAll('[data-error-for]').forEach((node) => {
      const field = node.dataset.errorFor;
      node.textContent = errors[field] || '';
      form.elements[field]?.setAttribute('aria-invalid', errors[field] ? 'true' : 'false');
    });
  };

  const showStatus = (message, type = '') => {
    status.textContent = message;
    status.className = `form-status ${type}`.trim();
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    showStatus('');
    const values = Object.fromEntries(new FormData(form));
    if (values.website) return;

    const errors = validateLead(values);
    showErrors(errors);
    if (Object.keys(errors).length) {
      form.elements[Object.keys(errors)[0]]?.focus();
      showStatus('Revisa los campos señalados.', 'error');
      return;
    }

    const config = window.CASHPE_CONFIG || {};
    if (!config.supabaseUrl || !config.anonKey || !config.leadsTable) {
      showStatus('La conexión aún no está disponible. Inténtalo nuevamente más tarde.', 'error');
      return;
    }

    submit.disabled = true;
    label.textContent = 'Enviando…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
      const rawPayload = buildLeadPayload(values);
      const payload = Object.fromEntries(Object.entries(rawPayload).map(([key, value]) => [config.columns?.[key] || key, value]));
      const response = await fetch(`${config.supabaseUrl}/rest/v1/${encodeURIComponent(config.leadsTable)}`, {
        method: 'POST',
        headers: {
          apikey: config.anonKey,
          Authorization: `Bearer ${config.anonKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Supabase responded ${response.status}`);
      form.reset();
      showErrors({});
      showStatus('Solicitud enviada. Nuestro equipo se pondrá en contacto contigo.', 'success');
    } catch (error) {
      const message = error.name === 'AbortError' ? 'La conexión tardó demasiado. Vuelve a intentarlo.' : 'No pudimos enviar la solicitud. Inténtalo nuevamente.';
      showStatus(message, 'error');
    } finally {
      clearTimeout(timeout);
      submit.disabled = false;
      label.textContent = 'Enviar solicitud';
    }
  });
}
