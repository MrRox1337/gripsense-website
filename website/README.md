# Smart Object-in-Hand Aware Universal Gripper — Portfolio & Research Log

A single-page Vue 3 + Vite + Tailwind site with a Bauhaus visual identity, built to
present the dissertation and its weekly research log. Content is generated automatically
from the plain-text files in the sibling `../Progress/` folder.

## Run it

```bash
cd website
npm install      # first time only
npm run dev      # -> http://localhost:5173
```

## Add new content (no code changes needed)

The site reads `../Progress/*.txt` at build time via `import.meta.glob`, so:

1. **New weekly entry** — drop `Week_4.txt`, `Week_5.txt` … `Week_12.txt` into
   `../Progress/`. A card, a full article and image placeholders appear automatically.
2. **New meeting** — drop `Meeting_3.txt` etc. into `../Progress/`. A new timeline entry
   appears.
3. **Images** — drop image files into `../Progress/images/`. The article figures reference
   these suggested names (rename yours to match, or leave them out to keep the styled
   placeholder that names the expected file):
   - `week-1-grippers.jpg`, `week-1-taxonomy.jpg`
   - `week-2-servos.jpg`, `week-2-pd-stepper.jpg`
   - `week-3-brief.jpg`
   - future weeks auto-request `week-N-fig-1.jpg`

### Text formatting the parser understands
- Blank line = new paragraph (hard-wrapped source lines are re-flowed automatically).
- Lines starting with `-`, `*` or `•` become bullet lists.
- A `//TODO …` line is hidden from the page and flags the entry as **In progress**.
- BibTeX-style keys like `WadaKentaro2017Pvhr` render as tidy `Wada Kentaro (2017)` citations.

### Optional polish (titles, tags, figure captions)
Human titles, tags and curated figure captions live in `src/content.js` under `CURATED`.
Add an entry keyed by post id (`week-4`, `meeting-3`, …) to override the auto-generated
defaults. Anything without an entry still renders fine.

## Edit the copy & links
All user-facing text and links are centralised in **`src/data/site.js`**:
your bio, the supervisor block, the five Files buttons (GitHub / STL / Onshape / Report /
Video) and the contact links (LinkedIn, GrabCAD, Printables, mdx.ac.ae, Email). Replace
the `#` placeholders with real URLs.

## Re-skin
The three Bauhaus primaries and the paper/ink neutrals are CSS variables at the top of
`src/style.css` (`@theme` block). Change three hexes to re-colour the whole site.

## Build & deploy to GitHub Pages

```bash
npm run build     # outputs to website/dist/
npm run preview   # locally preview the production build
```

`vite.config.js` sets `base: './'` (relative paths), so the built site works from any
GitHub Pages URL — no repo name to hard-code. Deploy `website/dist/` however you prefer:

- **GitHub Actions** (recommended): a workflow that runs `npm ci && npm run build` in
  `website/` and publishes `website/dist/` via `actions/deploy-pages`.
- **Manual / `gh-pages` branch**: push the contents of `website/dist/` to the `gh-pages`
  branch (or a `/docs` folder on `main`) and point Pages at it.
