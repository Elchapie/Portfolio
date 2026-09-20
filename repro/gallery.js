/**
 * repro: the work grid hides its final page of projects.
 *
 *   npm run repro:gallery
 *
 * Exits non-zero while the bug is present, zero once the grid can reach every
 * project it claims to show.
 */

import { pageCount, paginate, PER_PAGE } from '../src/gallery.js';
import { projects } from '../src/projects.js';

const total = projects.length;
const pages = pageCount(total, PER_PAGE);

const reachable = new Set();
for (let page = 1; page <= pages; page += 1) {
  for (const project of paginate(projects, page, PER_PAGE)) reachable.add(project.id);
}

console.log(`projects: ${total}`);
console.log(`per page: ${PER_PAGE}`);
console.log(`pages reported by pageCount(): ${pages}`);
console.log(`projects reachable by paging through those pages: ${reachable.size}`);

const missing = projects.filter((p) => !reachable.has(p.id)).map((p) => p.id);

if (missing.length > 0) {
  console.error(`\nFAIL: ${missing.length} project(s) are on no page at all: ${missing.join(', ')}`);
  console.error('The grid stops offering more work before it runs out of work.');
  process.exit(1);
}

console.log('\nPASS: every project is reachable.');
