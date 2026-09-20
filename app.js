/**
 * Page glue: work grid, filters and the contact form.
 * All the interesting logic lives in src/ so it can be tested without a DOM.
 */

import { projects, searchProjects, sortByNewest, allTags, filterByTag } from './src/projects.js';
import { paginate, pageCount, PER_PAGE } from './src/gallery.js';
import { formatMonthYear } from './src/dates.js';
import { validateEnquiry } from './src/contact.js';

const state = { query: '', tag: 'All', page: 1 };

const grid = document.querySelector('#work-grid');
const empty = document.querySelector('#work-empty');
const countLine = document.querySelector('#work-count');
const moreButton = document.querySelector('#more-work');
const searchInput = document.querySelector('#work-search');
const filterBar = document.querySelector('#work-filters');
const form = document.querySelector('#enquiry-form');
const formStatus = document.querySelector('#enquiry-status');

function results() {
  return sortByNewest(filterByTag(searchProjects(projects, state.query), state.tag));
}

/** Pages 1..state.page, concatenated — the grid grows, it doesn't replace. */
function visiblePages(list) {
  const out = [];
  for (let page = 1; page <= state.page; page += 1) out.push(...paginate(list, page));
  return out;
}

function card(project) {
  const article = document.createElement('article');
  article.className = 'card';
  article.id = project.id;

  const art = document.createElement('div');
  art.className = 'card-art';
  art.style.setProperty('--accent', project.accent);
  art.style.setProperty('--shade', project.shade);
  art.setAttribute('aria-hidden', 'true');
  const monogram = document.createElement('span');
  monogram.textContent = project.client;
  art.append(monogram);

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  const title = document.createElement('h3');
  title.textContent = project.title;
  const when = document.createElement('p');
  when.className = 'card-date';
  when.textContent = formatMonthYear(project.date);
  meta.append(title, when);

  const blurb = document.createElement('p');
  blurb.className = 'card-blurb';
  blurb.textContent = project.blurb;

  const tags = document.createElement('ul');
  tags.className = 'card-tags';
  for (const tag of project.tags) {
    const li = document.createElement('li');
    li.textContent = tag;
    tags.append(li);
  }

  article.append(art, meta, blurb, tags);
  return article;
}

function render() {
  const list = results();
  const pages = pageCount(list.length, PER_PAGE);
  const shown = visiblePages(list);

  grid.replaceChildren(...shown.map(card));
  empty.hidden = list.length > 0;
  countLine.textContent = `Showing ${shown.length} of ${list.length}`;
  moreButton.hidden = list.length === 0 || state.page >= pages;
}

function buildFilters() {
  for (const tag of ['All', ...allTags(projects)]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter';
    button.textContent = tag;
    button.setAttribute('aria-pressed', String(tag === state.tag));
    button.addEventListener('click', () => {
      state.tag = tag;
      state.page = 1;
      for (const other of filterBar.querySelectorAll('.filter')) {
        other.setAttribute('aria-pressed', String(other === button));
      }
      render();
    });
    filterBar.append(button);
  }
}

searchInput.addEventListener('input', (event) => {
  state.query = event.target.value;
  state.page = 1;
  render();
});

moreButton.addEventListener('click', () => {
  state.page += 1;
  render();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const result = validateEnquiry({ email: data.email, message: data.message });

  formStatus.textContent = result.ok
    ? 'Thanks — that came through. This demo does not send anything anywhere.'
    : result.reason;
  formStatus.classList.toggle('is-error', !result.ok);
  if (result.ok) form.reset();
});

buildFilters();
render();
