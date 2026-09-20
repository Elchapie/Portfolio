import test from 'node:test';
import assert from 'node:assert/strict';

import { paginate, pageCount, PER_PAGE } from '../src/gallery.js';

test('paginate returns a full page of items', () => {
  const items = ['a', 'b', 'c', 'd', 'e', 'f'];
  assert.deepEqual(paginate(items, 1), ['a', 'b', 'c']);
  assert.deepEqual(paginate(items, 2), ['d', 'e', 'f']);
});

test('paginate returns a short final page', () => {
  assert.deepEqual(paginate(['a', 'b', 'c', 'd'], 2), ['d']);
});

test('paginate past the end returns nothing', () => {
  assert.deepEqual(paginate(['a', 'b'], 5), []);
});

test('pageCount counts whole pages', () => {
  assert.equal(pageCount(6, 3), 2);
  assert.equal(pageCount(3, 3), 1);
  assert.equal(pageCount(9, 3), 3);
});

test('pageCount of an empty grid is zero', () => {
  assert.equal(pageCount(0, 3), 0);
});

test('PER_PAGE is a positive integer', () => {
  assert.ok(Number.isInteger(PER_PAGE) && PER_PAGE > 0);
});
