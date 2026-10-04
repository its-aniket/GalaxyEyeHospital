import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hospitalDate, lastAppointmentDate, isFutureSlot, normalizePhone, validateContact } from '../src/lib/appointmentForm.ts';

test('dates follow IST across UTC midnight and year boundaries', () => {
  assert.equal(hospitalDate(new Date('2026-12-31T20:00:00Z')), '2027-01-01');
  assert.equal(lastAppointmentDate(new Date('2026-12-31T20:00:00Z')), '2027-04-01');
});
test('slots handle noon, midnight, expiry and invalid dates', () => {
  const now = new Date('2026-09-06T06:30:00Z');
  assert.equal(isFutureSlot('2026-09-06', '12:00 PM', now), false);
  assert.equal(isFutureSlot('2026-09-06', '12:01 PM', now), true);
  assert.equal(isFutureSlot('2026-09-06', '12:00 AM', now), false);
  assert.equal(isFutureSlot('2026-09-07', '12:00 AM', now), true);
  assert.equal(isFutureSlot('2026-09-07', '25:00 PM', now), false);
  assert.equal(isFutureSlot('2026-02-30', '10:00 AM', now), false);
  assert.equal(isFutureSlot('', '10:00 AM', now), false);
});
test('contact validation accepts country codes and rejects malformed data', () => {
  assert.equal(normalizePhone('+91 (98765) 43210'), '9876543210');
  assert.equal(validateContact(' Test Patient ', '+91 98765 43210', 'patient@example.com'), null);
  assert.ok(validateContact('  ', '9876543210', 'patient@example.com'));
  assert.ok(validateContact('Test Patient', '1234567890', 'patient@example.com'));
  assert.ok(validateContact('Test Patient', '9876543210', 'invalid@example'));
});
