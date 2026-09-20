/**
 * repro: the search box only matches when the visitor copies the site's
 * capitalisation exactly.
 *
 *   npm run repro:search
 */

import { projects, searchProjects } from '../src/projects.js';

const cases = [
  { query: 'atlas', expect: 'atlas' },
  { query: 'Meridian', expect: 'meridian' },
  { query: 'packaging', expect: 'atlas' },
  { query: 'BRANDING', expect: 'solace' },
];

let failures = 0;

for (const { query, expect } of cases) {
  const hits = searchProjects(projects, query).map((p) => p.id);
  const ok = hits.includes(expect);
  console.log(`${ok ? 'ok  ' : 'FAIL'} search ${JSON.stringify(query)} -> [${hits.join(', ') || 'nothing'}]`);
  if (!ok) {
    console.log(`     expected to find: ${expect}`);
    failures += 1;
  }
}

if (failures > 0) {
  console.error(`\nFAIL: ${failures} of ${cases.length} searches missed work that is on the site.`);
  process.exit(1);
}

console.log('\nPASS: search finds work regardless of capitalisation.');
