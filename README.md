Portfolio

Built as a **dependency-free static site** (HTML + CSS + vanilla JS) so it deploys identically to
both Vercel and GitHub Pages — no build step required.

## Structure

```
.
├── index.html              # Single-page site
├── assets/
│   ├── css/style.css       # All styling + responsive + reduced-motion
│   └── js/main.js          # Cursor, preloader, reveal, counters, FAQ, menu
├── vercel.json             # Vercel config (clean URLs + asset caching)
├── .github/workflows/      # GitHub Pages deploy workflow
└── .nojekyll               # Tells Pages to serve files as-is
```

## Run locally

Just open `index.html`, or serve it:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel → **Add New… → Project** → import the repo.
3. Framework preset: **Other**. Build command: *none*. Output dir: `./` (root).
4. Deploy. `vercel.json` handles clean URLs and caching automatically.

Or from the CLI:

```bash
npm i -g vercel
vercel --prod
```
---

© Nischal S Narayana. Designed & built from first principles.
