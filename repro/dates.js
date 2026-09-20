/**
 * repro: project cards show the wrong month.
 *
 *   npm run repro:dates
 *
 * Job-sheet dates are DD/MM/YYYY. Each case pairs an input with the month a
 * designer reading the same date off the sheet would expect.
 */

import { formatMonthYear } from '../src/dates.js';

const cases = [
  ['02/08/2025', 'August 2025'],
  ['21/06/2025', 'June 2025'],
  ['11/12/2024', 'December 2024'],
  ['05/07/2024', 'July 2024'],
];

let failures = 0;

for (const [input, expected] of cases) {
  const actual = formatMonthYear(input);
  const ok = actual === expected;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${input} -> ${actual}${ok ? '' : `   (expected ${expected})`}`);
  if (!ok) failures += 1;
}

if (failures > 0) {
  console.error(`\nFAIL: ${failures} of ${cases.length} dates are labelled with the wrong month.`);
  process.exit(1);
}

console.log('\nPASS: DD/MM/YYYY dates are labelled with the month they name.');
