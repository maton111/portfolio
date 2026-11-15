# Portfolio — Mattia Archinà

Personal portfolio with a HUD / terminal visual language: [mattiaarchina.com](https://mattiaarchina.com).

## Stack

- **Frontend:** React 19, TypeScript, Vite, React Router, i18next (IT / EN)
- **Visuals:** WebGL2 shader (hero background, no 3D library), cobe (contact globe), plain CSS with design tokens in `src/index.css`
- **Backend:** small Express server (`server.js`) for the contact form (Nodemailer) and repo metadata
- **Deploy:** GitHub Actions on a self-hosted runner → nginx + PM2 (`.github/workflows/deploy.yml`). Every push to `main` deploys.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server on `http://localhost:4321` |
| `npm run server` | Contact API on port `4307` (needs `.env`) |
| `npm run dev-server` | Both of the above together |
| `npm run build` | Type-check and production build to `dist/` |
| `npm run lint` | ESLint |

Without the API running, the site works but the contact form and the "last update" readout fail gracefully.

## Structure

```
src/
  sections/        Home page sections (Hero, About, Skills, Projects, Timeline, Blog, Contact)
  pages/           Routed pages (project notes, blog, 404) — each one is a lazy chunk
  components/
    layout/        Site footer
    overlays/      Boot intro, command palette, glitch transition
    ui/            Reusable pieces (hero backdrop shader, HUD card, globe, …)
  hooks/           useTheme, useReveal, useInitialBoot, useDocumentMeta, …
  data/            Structural content (projects, blog posts, navigation)
  i18n/locales/    All copy, in it.json and en.json
public/            favicon, Open Graph image, robots.txt, sitemap.xml, web manifest
```

## Things worth knowing

- **Command palette:** `Ctrl/⌘ + K` anywhere — sections, projects, posts, theme, language, CV.
- **Boot intro:** shown once per session on the home page only; `Esc` skips it, and it is disabled under `prefers-reduced-motion`.
- **Adding a project or post:** add the entry in `src/data/`, its copy in both locale files, and its URL in `public/sitemap.xml`.
- **Images:** keep bundled assets small (WebP). `src/assets/logo.png` is the 2000px master and is not imported anywhere; the app uses `logo.webp`.
