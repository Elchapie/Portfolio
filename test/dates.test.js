import test from 'node:test';
import assert from 'node:assert/strict';

import { parseDate, formatMonthYear } from '../src/dates.js';

test('a well-formed date names its month', () => {
  assert.equal(formatMonthYear('07/07/2024'), 'July 2024');
});

test('anything that is not DD/MM/YYYY is shown as a dash', () => {
  assert.equal(formatMonthYear(''), '—');
  assert.equal(formatMonthYear(undefined), '—');
  assert.equal(formatMonthYear('August 2025'), '—');
});

test('parseDate rejects malformed input rather than guessing', () => {
  assert.equal(parseDate('2025-08-02'), null);
  assert.equal(parseDate('2/8/2025'), null);
  assert.equal(parseDate(null), null);
});

test('parseDate returns a Date for a valid value', () => {
  assert.ok(parseDate('02/08/2025') instanceof Date);
});
