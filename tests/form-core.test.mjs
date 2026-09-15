import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLeadPayload, validateLead } from '../assets/js/form-core.mjs';

const validLead = { name: ' Ana Torres ', company: ' Mercado Uno ', email: ' ana@mercado.pe ', phone: ' +51 999 111 222 ', business_type: 'Retail', cash_volume: 'S/ 10,000 a S/ 30,000', message: 'Necesitamos reducir diferencias de caja.', website: '' };

test('validateLead accepts a complete commercial request', () => {
  assert.deepEqual(validateLead(validLead), {});
});

test('validateLead rejects missing identity and malformed contact data', () => {
  const errors = validateLead({ ...validLead, name: '', email: 'correo-invalido', phone: '12' });
  assert.equal(errors.name, 'Ingresa tu nombre.');
  assert.equal(errors.email, 'Ingresa un correo válido.');
  assert.equal(errors.phone, 'Ingresa un teléfono válido.');
});

test('buildLeadPayload trims values and adds the web source', () => {
  const payload = buildLeadPayload(validLead);
  assert.equal(payload.name, 'Ana Torres');
  assert.equal(payload.company, 'Mercado Uno');
  assert.equal(payload.email, 'ana@mercado.pe');
  assert.equal(payload.source, 'cashpe-web');
  assert.equal(payload.website, undefined);
});
