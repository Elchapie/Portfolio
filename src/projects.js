/**
 * Project data and the queries the work grid runs over it.
 * -------------------------------------------------------
 * Dates are held the way they're written on the site — DD/MM/YYYY — because
 * this list is maintained by hand and gets pasted in from job sheets.
 */

export const projects = [
  {
    id: 'meridian',
    title: 'Meridian Type Foundry',
    client: 'Meridian',
    date: '02/08/2025',
    tags: ['Branding', 'Type'],
    blurb: 'Wordmark, specimen sheets and a variable-font system for a two-person type foundry.',
    accent: '#4c6ef5',
    shade: '#1b2450',
  },
  {
    id: 'northbound',
    title: 'Northbound Festival',
    client: 'Northbound',
    date: '21/06/2025',
    tags: ['Poster', 'Campaign'],
    blurb: 'Identity and a forty-poster campaign for a three-day festival on the Norfolk coast.',
    accent: '#e8590c',
    shade: '#41200a',
  },
  {
    id: 'solace',
    title: 'Solace Skincare',
    client: 'Solace',
    date: '09/03/2025',
    tags: ['Packaging', 'Branding'],
    blurb: 'Carton system, label hierarchy and shelf-presence testing for a skincare range.',
    accent: '#2f9e44',
    shade: '#123018',
  },
  {
    id: 'fieldnotes',
    title: 'Field Notes Zine',
    client: 'Self-published',
    date: '17/02/2025',
    tags: ['Editorial', 'Print'],
    blurb: 'A sixty-four page risograph zine on urban foraging. Two spot colours, no bleed.',
    accent: '#f08c00',
    shade: '#3d2605',
  },
  {
    id: 'lantern',
    title: 'Lantern Health',
    client: 'Lantern',
    date: '11/12/2024',
    tags: ['Branding', 'Wayfinding'],
    blurb: 'A calm, legible identity for a network of community clinics, built to survive photocopying.',
    accent: '#0c8599',
    shade: '#08282e',
  },
  {
    id: 'harbour',
    title: 'Harbour & Co',
    client: 'Harbour & Co',
    date: '30/11/2024',
    tags: ['Branding', 'Web'],
    blurb: 'Rebrand for a forty-year-old chandlery: new mark, signage and a small ordering site.',
    accent: '#1c7ed6',
    shade: '#0b2136',
  },
  {
    id: 'atlas',
    title: 'Atlas Coffee Roasters',
    client: 'Atlas',
    date: '14/09/2024',
    tags: ['Packaging', 'Branding'],
    blurb: 'Origin-led bag design, a five-tier roast palette and a stamp system for small batches.',
    accent: '#a0522d',
    shade: '#2e150b',
  },
  {
    id: 'quarry',
    title: 'Quarry Records',
    client: 'Quarry',
    date: '05/07/2024',
    tags: ['Packaging', 'Editorial'],
    blurb: 'Sleeve artwork and a lyric booklet for a reissue series of four nineteen-eighties LPs.',
    accent: '#6741d9',
    shade: '#221849',
  },
];

/** Free-text search across titles, clients and tags. */
export function searchProjects(list, query) {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((p) => p.title.includes(q) || p.tags.some((tag) => tag.includes(q)));
}

/** Newest first. Returns a copy — the caller's array is never reordered. */
export function sortByNewest(list) {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

/** Every tag in use, alphabetical. */
export function allTags(list) {
  return [...new Set(list.flatMap((p) => p.tags))].sort((a, b) => a.localeCompare(b));
}

export function filterByTag(list, tag) {
  if (!tag || tag === 'All') return list;
  return list.filter((p) => p.tags.includes(tag));
}
