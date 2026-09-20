# Philp Maxwel — portfolio

Site for Philp Maxwel, a graphic designer in Norwich working on brand identity,
print and packaging. Static HTML, one stylesheet, one ES module. No build step,
no dependencies.

## Running it

```bash
npm run serve      # http://localhost:4173
```

The page uses native ES modules, so it has to be served over `http://` — opening
`index.html` from the filesystem will not load the scripts.

## Tests

```bash
npm test
```

The suite covers the logic behind the work grid (paging, search, sorting,
date labels) and the enquiry form validation. `node --test`, no test framework.

## Repro scripts

`repro/` holds small scripts that check the behaviour a visitor actually sees,
one script per area of the site. Each one exits non-zero when the site is not
doing what it claims:

```bash
npm run repro:gallery    # every project is reachable from the work grid
npm run repro:search     # search finds work regardless of capitalisation
npm run repro:sort       # "Selected work" is newest-first
npm run repro:dates      # project cards name the right month
npm run repro:email      # the enquiry form accepts real addresses
```

## Layout

```
index.html, styles.css, app.js   the site itself
src/                             logic behind the grid and the form
test/                            unit tests (npm test)
repro/                           behaviour checks (npm run repro:*)
scripts/serve.js                 local static server
```

## Editing the work list

Projects live in `src/projects.js`. Dates are written the way they appear on the
job sheets — `DD/MM/YYYY` — and the grid formats them for display.

---

© Philp Maxwel. Design work shown is illustrative.
