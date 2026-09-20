import test from 'node:test';
import assert from 'node:assert/strict';

import { projects, searchProjects, sortByNewest, allTags, filterByTag } from '../src/projects.js';

test('every project carries what the grid renders', () => {
  for (const p of projects) {
    for (const field of ['id', 'title', 'client', 'date', 'blurb', 'accent', 'shade']) {
      assert.ok(p[field], `${p.id ?? '?'} is missing ${field}`);
    }
    assert.ok(Array.isArray(p.tags) && p.tags.length > 0, `${p.id} has no tags`);
  }
});

test('project ids are unique', () => {
  assert.equal(new Set(projects.map((p) => p.id)).size, projects.length);
});

test('an empty query returns everything', () => {
  assert.equal(searchProjects(projects, '').length, projects.length);
  assert.equal(searchProjects(projects, '   ').length, projects.length);
});

test('a query that matches nothing returns nothing', () => {
  assert.deepEqual(searchProjects(projects, 'zzzzz'), []);
});

test('sortByNewest returns a same-length copy and leaves the input alone', () => {
  const input = [...projects];
  const sorted = sortByNewest(input);
  assert.equal(sorted.length, projects.length);
  assert.notEqual(sorted, input);
  assert.deepEqual(input, projects, 'the caller’s array was reordered');
});

test('allTags is unique and alphabetical', () => {
  const tags = allTags(projects);
  assert.equal(new Set(tags).size, tags.length);
  assert.deepEqual(tags, [...tags].sort((a, b) => a.localeCompare(b)));
});

test('filterByTag narrows to projects carrying that tag', () => {
  const packaging = filterByTag(projects, 'Packaging');
  assert.ok(packaging.length > 0);
  assert.ok(packaging.every((p) => p.tags.includes('Packaging')));
  assert.equal(filterByTag(projects, 'All').length, projects.length);
});
