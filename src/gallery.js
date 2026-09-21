/**
 * Work-grid pagination.
 * ---------------------
 * The grid renders PER_PAGE projects at a time and grows a page at a time via
 * the "More work" button. Both the button's visibility and the "showing x of
 * y" line are driven by the helpers here, so a mistake in either shows up as
 * projects that the visitor can never reach.
 */

export const PER_PAGE = 3;

/** The slice of `items` that belongs on `page` (1-based). */
export function paginate(items, page, perPage = PER_PAGE) {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

/** How many pages `total` items need. */
export function pageCount(total, perPage = PER_PAGE) {
  if (total <= 0) return 0;
  return Math.ceil(total / perPage);
}
