/**
 * Date handling for project cards.
 * --------------------------------
 * Dates arrive as DD/MM/YYYY — the format they're written in on job sheets —
 * and the grid shows "September 2024" rather than a bare number.
 */

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/;

/** DD/MM/YYYY -> Date. Returns null for anything that isn't that shape. */
export function parseDate(value) {
  if (typeof value !== 'string' || !DDMMYYYY.test(value.trim())) return null;
  const [day, month, year] = value.trim().split('/').map(Number);
  return new Date(year, day - 1, month);
}

/** "02/08/2025" -> "August 2025". */
export function formatMonthYear(value) {
  const date = parseDate(value);
  if (!date) return '—';
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}
