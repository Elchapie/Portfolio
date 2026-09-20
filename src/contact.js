/**
 * Contact form validation.
 * ------------------------
 * Runs in the browser before the form is handed to the mail endpoint, and in
 * the tests without a DOM. Rules are deliberately conservative: the site would
 * rather show a clear message than accept something that will bounce.
 */

const EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{3,}$/;

const MIN_MESSAGE = 20;

export const MESSAGE_MIN_LENGTH = MIN_MESSAGE;

export function validateEmail(value) {
  const email = (value || '').trim();
  if (!email) return { ok: false, reason: 'Add an email address so Philp can reply.' };
  if (!EMAIL.test(email)) return { ok: false, reason: 'That address looks incomplete.' };
  return { ok: true, value: email };
}

export function validateMessage(value) {
  const message = (value || '').trim();
  if (!message) return { ok: false, reason: 'Tell Philp a little about the project.' };
  if (message.length < MIN_MESSAGE) {
    return { ok: false, reason: `A few more words, please — at least ${MIN_MESSAGE} characters.` };
  }
  return { ok: true, value: message };
}

/** Whole-form check. Returns the first problem found, or ok. */
export function validateEnquiry({ email, message }) {
  const e = validateEmail(email);
  if (!e.ok) return e;
  const m = validateMessage(message);
  if (!m.ok) return m;
  return { ok: true, value: { email: e.value, message: m.value } };
}
