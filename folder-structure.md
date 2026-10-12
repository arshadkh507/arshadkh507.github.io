# Folder Structure — Arshad Khan Portfolio

> Reflects decisions in `project-context.md` §8: runtime JS-include for shared markup, hand-authored HTML per project, incremental in-place migration starting at `index.html`.

**Last updated:** 2026-10-10

---

```
arshadkh507.github.io/
├── index.html                      # REBUILD TARGET #1 — hero/about/experience/contact + featured project cards
├── robots.txt                      # done
├── llms.txt                        # done
├── llms-full.txt                   # done
├── sitemap.xml                     # done
├── 404.html                        # done — uses partials/include.js
│
├── partials/
│   ├── header.html                 # navbar markup, injected by include.js
│   └── footer.html
│
├── assets/
│   ├── css/
│   │   ├── index.css               # the single site stylesheet — tokens, base, components, all pages
│   │   └── project-detail.css      # done — loaded only by projects/<slug>/index.html
│   ├── js/
│   │   ├── include.js              # fetches + injects header.html/footer.html
│   │   ├── theme-toggle.js         # light/dark switch, localStorage + prefers-color-scheme
│   │   ├── scroll-animations.js    # IntersectionObserver fade/stagger
│   │   ├── slider.js               # project image slider (keyboard + touch + reduced-motion)
│   │   ├── nav.js                  # burger menu, smooth scroll, active-link state
│   │   └── contact-form.js         # Formspree submit handling
│   ├── images/
│   │   └── projects/
│   │       ├── _placeholder/       # done — 4 placeholder gallery SVGs, shared by all projects
│   │       └── <project-slug>/     # real screenshots, one folder per project (none yet)
│   ├── logos/                      # company logos used in the experience timeline
│   │   ├── iconaf-logo.jpg
│   │   ├── mindgigs-logo.jpg
│   │   └── tech-emulsion-logo.jpg
│   └── Full-Stack-Software-Engineer-v1-july-2026.pdf   # the resume of record
│
├── portfolio/
│   └── portfolio.html              # full projects grid, filterable (All / AI & Agents / Full Stack / Automation)
│
├── projects/                       # done — detail pages, served at the clean URL /projects/<slug>/
│   ├── README.md                   # how to replace placeholder screenshots + add a project
│   ├── kids-learning-app/index.html
│   ├── auto-repair-shop-management/index.html   # redirect stub → autocar-intelligence-platform (merged 2026-10-12)
│   ├── autocar-intelligence-platform/index.html
│   ├── linkedin-connection-automation/index.html
│   ├── multi-agent-seo-content-system/index.html
│   ├── art-gola-artist-platform/index.html
│   ├── health-on-point-pharmacy/index.html
│   └── faizan-auto-pos/index.html
│
```

Resume is PDF-only (`assets/Full-Stack-Software-Engineer-v1-july-2026.pdf`, linked from the hero and the CTA in `index.html`) — no standalone `resume.html`/`resume/` page. Blog is not on the site — no `blogs/` folder, no nav item.

## Retired in this restructure

Deleted outright, not migrated (dead weight identified in the initial audit, confirmed zero inbound links before deletion):
`portfolio/about/`, `portfolio/contact/`, `portfolio/resume/` (content confirmed fully covered by `index.html` sections + the PDF), `portfolio/blogs/` (placeholder-only "Under Construction" cards, incl. nested `blogs/react/react.html` copy), `portfolio/react/` (older duplicate react.html), `portfolio/dsa/` (0-byte file), `portfolio/projects/projects.html` + `project1/` (broken placeholder), unreferenced placeholder images (`project1.png`, `project2.png`, `project3.png`, `image-gallery-project.jpg`), `assets/js/main.js`, `assets/js/github-profile.js`, `assets/css/styles.css`.

`index.html` and `portfolio/portfolio.html` already cover About/Skills/Education/Experience/Contact as sections — nothing above was migrated because nothing above had unique content.

## Resolved 2026-09-04

The `/portfolio/` vs `/projects/` question is settled as a **split**: detail pages live at root-level `/projects/<slug>/` (clean URLs, requested directly), while the listing page stays at `/portfolio/portfolio.html` because it is the one project URL already in `sitemap.xml` and moving it would trade real indexed history for tidiness. Worth revisiting with a redirect if the listing page ever moves.

The CSS split drafted above (tokens/base/components/pages) was **not** carried out — `index.css` remains one ~3,280-line stylesheet, with only `project-detail.css` split out because it is needed on eight pages and on none of the others. Splitting the rest is still open, and would mean adding `<link>` tags to every page.

## Known unused

`portfolio/projects/images/` still holds five screenshots (`ams-project.png`, `image-gallery-project.png`, `lms-project.png`, `roadmap-codecamp-project.png`, `todo-app-react-project.jpg`) belonging to the student-era projects retired on 2026-09-04. Kept, not deleted, in case those projects return.

## Project set changed 2026-09-05

- `linkedin-automation-node-red/` → **`linkedin-connection-automation/`**, rewritten: the page
  described Node-RED, but the system was actually built as five n8n workflows (Apify scraping →
  Supabase → OpenRouter-written connection notes). No redirect stub was left at the old path —
  GitHub Pages has no server-side 301, and a meta-refresh page returns 200 and reads as a soft-404,
  which is a worse outcome than the clean 404 that `404.html` already serves.
- `multichat-ai-platform/` and `multica-hermes-agent-infrastructure/` **deleted**. Both described
  parts of one real project; the Hermes-runtime and Multica-orchestration content was merged into
  `multi-agent-seo-content-system/`.
- `health-on-point-pharmacy/` **added** — the ICONAF pharmacy platform, previously described only in
  the experience bullets with no case study of its own.

Net: eight detail pages → seven.

## Added 2026-09-20

- `favicon.svg` (repo root) — the site had no favicon; every page 404'd on it.
- `assets/logos/` — company logos for the experience timeline (`.jpg`; the originals were `.jfif`,
  which GitHub Pages does not reliably serve as an image type).
- `assets/images/projects/health-on-point-pharmacy/` — **redacted** admin screenshots.
- `assets/images/projects/faizan-auto-pos/` — cropped POS screenshots.
- `assets/health-on-point/` and `assets/faizan-auto/` — **unpublished originals**. Not referenced by
  any page. The Health on Point originals contain customer names, emails and phone numbers; do not
  wire them into a gallery without redacting first (see `project-context.md` §8).
- `projects/faizan-auto-pos/` — eighth case study.

Net: seven detail pages → eight.

## Added 2026-10-10

- `projects/hire-on-the-spot/` — ninth case study (no gallery yet).
- `assets/images/projects/kids-learning-app/` and `assets/images/projects/art-gola-artist-platform/`
  — 1600×900 WebP captures of the public sites, replacing the placeholders.
- `assets/logos/projects/` — one 256×256 logo tile per project: real brand marks for Ludooka, WickedFile,
  Art Gola, Hire On The Spot and Health on Point; designed SVGs for the other four.
- `assets/images/arshad-khan-portrait.webp` — About-section portrait.
- `.claude/skills/logo-design/` — how project logos are sourced or designed.
- `team/index.html` — Life at Tech Emulsion page; photos in `assets/images/team/` (+ `-800` variants).
- `assets/images/og/<slug>.jpg` — per-case-study social cards; `assets/images/og-team.jpg` for /team/.
- `assets/autocar-intelligence/` — AutoCar originals (customer names blurred) and
  `assets/images/projects/autocar-intelligence-platform/` — the 16:9 WebP gallery.
- `assets/certificates/` — the two Anthropic certificate PDFs (renamed to kebab-case, no spaces).
- `assets/images/certificates/` — WebP thumbnails rendered from those PDFs.
- `assets/health-on-point/` — originals now blurred and committed (see `project-context.md` §8).
- `.gitignore` now excludes `.claude/settings.local.json`, `/LinkedIn Banner/` (kept local until it
  ships), `/dev/` (stray git-hook copies) and `/.playwright-mcp/` (screenshot scratch output).

Net: eight detail pages → nine. Placeholder galleries remaining: auto-repair-shop-management,
multi-agent-seo-content-system.

## Changed 2026-10-12

- `projects/auto-repair-shop-management/` merged into `projects/autocar-intelligence-platform/`;
  the old folder now holds only a redirect stub. Its logo tile and social card were deleted.
- Multi-Agent SEO page: gallery replaced by an HTML architecture diagram (no images needed).

Net: nine case studies → eight. No placeholder galleries remain.
