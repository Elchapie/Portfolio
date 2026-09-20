/**
 * repro: "Selected work" is not ordered newest-first.
 *
 *   npm run repro:sort
 *
 * Compares the site's ordering against dates parsed independently here, so the
 * check does not depend on src/dates.js (which has its own problem).
 */

import { projects, sortByNewest } from '../src/projects.js';

function timeOf(ddmmyyyy) {
  const [dd, mm, yyyy] = ddmmyyyy.split('/').map(Number);
  return Date.UTC(yyyy, mm - 1, dd);
}

const expected = [...projects].sort((a, b) => timeOf(b.date) - timeOf(a.date)).map((p) => p.id);
const actual = sortByNewest(projects).map((p) => p.id);

console.log('expected order (newest first):', expected.join(' > '));
console.log('order on the site            :', actual.join(' > '));

if (expected.join() !== actual.join()) {
  const firstWrong = actual.findIndex((id, i) => id !== expected[i]);
  console.error(
    `\nFAIL: the grid is in the wrong order from position ${firstWrong + 1} ` +
      `(showing "${actual[firstWrong]}", newest remaining is "${expected[firstWrong]}").`
  );
  process.exit(1);
}

console.log('\nPASS: the grid is newest-first.');
