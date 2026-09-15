const clean = (value) => String(value ?? '').trim();

export function validateLead(values) {
  const errors = {};
  if (!clean(values.name)) errors.name = 'Ingresa tu nombre.';
  if (!clean(values.company)) errors.company = 'Ingresa el nombre de tu empresa.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(values.email))) errors.email = 'Ingresa un correo válido.';
  if (clean(values.phone).replace(/\D/g, '').length < 7) errors.phone = 'Ingresa un teléfono válido.';
  if (!clean(values.business_type)) errors.business_type = 'Selecciona el tipo de negocio.';
  if (!clean(values.cash_volume)) errors.cash_volume = 'Selecciona un rango aproximado.';
  return errors;
}

export function buildLeadPayload(values) {
  return {
    name: clean(values.name),
    company: clean(values.company),
    email: clean(values.email).toLowerCase(),
    phone: clean(values.phone),
    business_type: clean(values.business_type),
    cash_volume: clean(values.cash_volume),
    message: clean(values.message),
    source: 'cashpe-web',
  };
}
