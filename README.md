# Nischal S Narayana — Portfolio

A minimal, high-contrast editorial portfolio for an **Enterprise, Cloud & AI Solutions Architect**.
Design language inspired by [koziol.design](https://koziol.design): bold typography, custom cursor,
magnetic interactions and scroll-reveal animations.

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

## Deploy to GitHub Pages

1. Push to the `main` branch on GitHub.
2. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) publishes the site on every push to `main`.

Your site will be live at `https://<username>.github.io/<repo>/`.

> If you deploy to a project subpath (e.g. `username.github.io/Portfolio`), the relative
> asset paths used here (`assets/...`) work as-is — no base-path changes needed.

## Customize

- **Content** lives in `index.html` (hero copy, work cards, expertise, about, FAQ).
- **Links**: update LinkedIn/GitHub URLs in the footer and the email in the contact section.
- **Colors / fonts**: tweak the CSS variables at the top of `assets/css/style.css`.

---

© Nischal S Narayana. Designed & built from first principles.
