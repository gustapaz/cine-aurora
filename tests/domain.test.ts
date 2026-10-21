import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  totalPrice,
  validateSelection,
  occupiedSeats,
  sanitizeBookings,
} from '../src/lib/domain.ts';
import { allSeats } from '../src/lib/data.ts';
import type { Booking } from '../src/lib/domain.ts';
const free = allSeats.filter((s) => !occupiedSeats('d1-f1').includes(s));
const sample: Booking = {
  id: 'AUR-12345678',
  sessionId: 'd1-f1',
  seats: [free[0]!],
  half: 0,
  name: 'Alex Aurora',
  total: 32,
  createdAt: '2026-10-21T12:00:00Z',
  cancelled: false,
};
test('calcula inteiras e meias sem cobrar taxas', () => {
  assert.equal(totalPrice(3, 1), 80);
  assert.equal(totalPrice(2, 2), 32);
  for (const args of [
    [0, 0],
    [7, 0],
    [2, 3],
    [2, -1],
    [1.5, 0],
  ])
    assert.throws(() => totalPrice(args[0]!, args[1]!), RangeError);
});
test('bloqueia assentos ocupados, duplicados e sessões inexistentes', () => {
  assert.equal(validateSelection('d1-f1', [free[0]!]), '');
  assert.ok(validateSelection('d1-f1', [occupiedSeats('d1-f1')[0]!]));
  assert.ok(validateSelection('d1-f1', [free[0]!, free[0]!]));
  assert.ok(validateSelection('x', [free[0]!]));
  assert.ok(validateSelection('d1-f1', []));
  assert.ok(validateSelection('d1-f1', free.slice(0, 7)));
});
test('cancelar ingresso libera assentos da simulação local', () => {
  assert.ok(validateSelection('d1-f1', sample.seats, [sample]));
  assert.equal(validateSelection('d1-f1', sample.seats, [{ ...sample, cancelled: true }]), '');
});
test('recuperação de carteira rejeita valores ou registros adulterados', () => {
  assert.deepEqual(sanitizeBookings([sample]), [sample]);
  assert.deepEqual(
    sanitizeBookings([
      { ...sample, total: 0 },
      { ...sample, half: 3 },
      { ...sample, seats: ['Z99'] },
      { ...sample, name: '' },
      { ...sample, createdAt: 'invalid' },
    ]),
    [],
  );
  assert.deepEqual(sanitizeBookings(null), []);
});
