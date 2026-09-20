import test from 'node:test';
import assert from 'node:assert/strict';

import { validateEmail, validateMessage, validateEnquiry, MESSAGE_MIN_LENGTH } from '../src/contact.js';

test('an ordinary address is accepted', () => {
  assert.equal(validateEmail('philp@maxwel.com').ok, true);
  assert.equal(validateEmail('studio@hello.design').ok, true);
});

test('addresses are trimmed before they are checked', () => {
  assert.equal(validateEmail('  philp@maxwel.com  ').ok, true);
  assert.equal(validateEmail('  philp@maxwel.com  ').value, 'philp@maxwel.com');
});

test('an empty address is refused with a reason', () => {
  const result = validateEmail('');
  assert.equal(result.ok, false);
  assert.match(result.reason, /email address/i);
});

test('an address with no domain is refused', () => {
  assert.equal(validateEmail('philp@').ok, false);
  assert.equal(validateEmail('philp@maxwel').ok, false);
});

test('a message shorter than the minimum is refused', () => {
  assert.equal(validateMessage('hello').ok, false);
  assert.equal(validateMessage('x'.repeat(MESSAGE_MIN_LENGTH)).ok, true);
});

test('the whole-form check reports the first problem', () => {
  assert.equal(validateEnquiry({ email: '', message: '' }).ok, false);
  assert.equal(validateEnquiry({ email: 'philp@maxwel.com', message: 'short' }).ok, false);
  assert.equal(
    validateEnquiry({ email: 'philp@maxwel.com', message: 'a'.repeat(MESSAGE_MIN_LENGTH) }).ok,
    true
  );
});
