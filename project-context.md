# Project Context Document — Arshad Khan Portfolio

> Single source of truth for how this portfolio is built and where it's headed. Consult before starting any new task; update in place whenever a decision below changes — don't let it go stale.

**Last updated:** 2026-10-10

---

## 1. Tech Stack

- **HTML5, CSS3, vanilla JavaScript** — no frontend framework (React/Vue/etc.), and none is wanted. This is a deliberate choice, not a gap.
- **No build tool / bundler.** Files ship exactly as authored. Any tooling added later must not require a build step that breaks GitHub Pages' plain static serving.
- **No preprocessor** (no Sass/Less) — CSS must be written as valid vanilla CSS.
- **Icons:** Font Awesome. Load it once per page (currently double-loaded via both the Kit script and the cdnjs link — fix when touched).
- **Forms:** Formspree handles contact form submission — no backend/server code in this repo.

## 2. Hosting

- **GitHub Pages**, serving the repo root as a static site (`arshadkh507.github.io`).
- No server-side rendering, no environment variables, no secrets — everything in the repo is public and client-side only.
- Deployment = commit to the branch Pages is configured to serve. No CI build step exists or is required.

## 3. Design Goals

- **Developer / code aesthetic**: terminal-inspired, monospace-forward, code-bracket motifs (e.g. the existing `<Arshad/>` logo treatment). Should read as "built by an engineer, for engineers and recruiters evaluating one."
- **Modern and minimal**: purposeful spacing and color, no visual clutter, no decoration without function.
- Consistency matters more than novelty — every new page should feel like it belongs to the same system, not a one-off.

## 4. Key Features Required

- **One-page portfolio** — hero, about, experience, and contact stay as sections on `index.html`. This remains the primary landing experience.
- **Separate Projects page** — full project listing, filterable by category/stack.
- **Individual project detail pages** — DONE. One page per project at `/projects/<slug>/`: overview, role, key features, tech stack, challenges/solutions, results, gallery. Nine pages live (see §8, 2026-09-05, 2026-09-20 and 2026-10-10).
- **Image sliders with animation** — DONE. `assets/js/slider.js`, progressive enhancement over a plain `<ul>` of figures.
- **Light/Dark mode** — DONE. `data-theme` on `<html>`, localStorage-persisted, pre-paint inline script, Slide Track toggle in the header partial.
- **Responsive design** — consistent behavior across mobile/tablet/desktop, built on a shared breakpoint scale rather than ad hoc per-component breakpoints.

## 5. SEO / AI Requirements

- **`robots.txt`** — standard crawler directives.
- **`llms.txt`** — concise, structured summary of the site for LLM crawlers/agents.
- **`llms-full.txt`** — fuller detailed content dump for LLM crawlers/agents.
- **JSON-LD structured data** — `Person` schema already exists on `index.html`; extend with appropriate schema on individual project detail pages once they exist.

## 6. Typography Preferences

- **JetBrains Mono** — primary UI typeface (nav, labels, buttons, badges).
- **Fira Code** — reserved for literal code content only (has programming ligatures).
- **Space Grotesk** — headings/display text, sans-serif contrast to the monospace body.

## 7. Future Expansion

Not in current scope — design decisions now should not actively block these later:

- **LinkedIn banner generator page** — interactive tool to generate a LinkedIn profile banner image.
- **LinkedIn post builder page** — designed first in Figma, then implemented in HTML/CSS/JS.

## 8. Architecture Decisions

- **Shared markup (header/footer/nav):** runtime JS include — a script fetches `partials/header.html` / `partials/footer.html` and injects them on page load. No build tool. Rejected alternatives: manual copy-paste-with-audit (doesn't fix root cause), local generator script (works, but is a build step in spirit — off the table for now).
- **Project data (title/tags/links/description):** fully hand-authored HTML per project, duplicated by hand across the homepage preview card, the projects list card, and the detail page. Chosen over a single-JSON runtime-rendered approach specifically to keep content crawlable for SEO/AI requirements (§5). **Known trade-off, accepted deliberately:** this will drift as project count grows; revisit with a generator script if/when that becomes painful.
- **Project detail pages (added 2026-09-04):** one folder per project, `projects/<slug>/index.html`, served by GitHub Pages at the clean URL `/projects/<slug>/`. Content is plain static HTML so it stays crawlable (§5). The pages were *scaffolded* by a throwaway Node script kept outside the repo — the repo contains only the emitted HTML, so there is still no build step and the pages are hand-edited from here on. See `projects/README.md`.
- **Project manifest:** `assets/js/projects-data.js` lists slug/title/tagline/category/url for every project. It is the index over the detail pages, not their content — galleries and prose live in the HTML. It ships a localhost-only check that warns when a card links to a slug the manifest does not know, which is the cheap guard against the hand-duplication drift this section already accepts.
- **Breakpoints:** consolidated 2026-09-04 onto design-system.md §6 (`480/768/992`, plus `767` as the paired complement of `min-width: 768`). Verified at 21 widths from 320 to 2560 — no horizontal overflow, nav reachable at every width. Do not introduce a new ad-hoc width; pick the nearest documented one.
- **Images:** `<img>` carries `width`/`height` to reserve space against CLS, which means the CSS **must** also set `height: auto` wherever it overrides `width` — otherwise the attribute height wins and the image distorts. **The hero portrait was removed 2026-09-05**; the hero is now text plus a static terminal-styled status panel, so the LCP element is the `<h1>` and the page loads no above-the-fold image at all. `assets/images/profile-pic-4*.{webp,png}` are kept on disk but unreferenced.
- **Social preview:** `assets/images/og-card.png` (1200×630, generated from the site's own tokens) is referenced as `og:image` by all 11 pages. Regenerate it if the tagline or branding changes.
- **Quick navigation:** the header is not sticky and scrolls away. `assets/js/quick-nav.js` shows a floating glass nav once `#header` leaves the viewport, observed with IntersectionObserver rather than a hard-coded scroll offset. Markup lives in `partials/header.html` so every page gets it; placement is CSS (top-centre pill ≥768px, bottom bar <768px with `.scroll-to-top` lifted clear).
- **Card hover vs scroll-reveal:** both set `transform` at equal specificity, so the `.fade-in.animate-in` reveal silently cancelled card hover, and the reveal's stagger `transition-delay` leaked into hover (0.4s lag before a 0.6s ease). Project card hover is therefore declared at the **bottom** of `index.css`, after `.fade-in`, with `transition-delay: 0s`. Keep it there — moving it up reintroduces both bugs.
- **Container widths:** one content column, `--container-max: 1200px`, applied via `width: min(var(--container-max), 100% - 2 * var(--container-gutter))`. Replaced six competing caps (main 1440 / header 1400 / navbar 1200 / hero 1200 / complete-portfolio 1200 / section-container unbounded). The page background pattern lives on `<body>` so it spans the viewport; `main` is a transparent full-width wrapper.
- **NDA on project naming:** client-identifying names are renamed before publication where the client requires it (e.g. the AI children's book platform ships as "Kids Learning App"). Check before adding a new project name.
- **Migration strategy:** incremental, in-place, on the main branch — not a parallel-branch rebuild. Starting point is `index.html`; project detail pages get added one at a time as project data is supplied, not built out speculatively ahead of content.
- **Positioning (2026-09-05):** the site now argues for **AI / LLM / agent engineering** roles first,
  with full-stack (MERN / React / Node) as the supporting credential — not the other way round. The
  `<h1>` stays "Full Stack Software Engineer" with an "building AI & agent systems" subline, because
  the CV and the work history both back that framing; the ordering of evidence (featured projects,
  experience bullets, stats) is what carries the AI claim. Featured work is deliberately 2 AI + 2
  full-stack. Location is **Peshawar** everywhere (meta, JSON-LD, contact, llms.txt) — it was
  inconsistently Islamabad before.
- **Claims must be traceable (2026-09-05):** every number on the homepage resolves to something a
  visitor can open — 1.4M+ records and the 13-phase pipeline both have project pages that explain
  them. The previous `3+ / 10+ / 50+ / 100%` band was removed for being unfalsifiable filler. When
  adding a stat, add the page that backs it in the same change.
- **Unverified content is a bug, not filler (2026-09-05):** three project pages carried tools that
  were never used (Node-RED on the LinkedIn automation; HubSpot, Claude, Node.js and ACP on the SEO
  system). These were scaffolded prose, not facts. Do not add a tool to a stack list unless it was
  actually used — an interviewer reads these pages as claims.
- **Client naming (2026-09-05, extends the NDA note above):** tools and APIs are named freely, and
  public client products are named (Health on Point, Invent Group, Indalo Wealth, Faizan Auto). Two
  clients are deliberately anonymous: the LinkedIn automation ("an agency CEO's outbound workflow")
  and the SEO system ("a marketing content agency").
- **Spacing tokens (2026-09-05):** design-system.md §3 has always specified `--space-1`…`--space-24`,
  but they were never declared in `index.css`. They are now, in the typography/shape `:root` block.
  Existing rules still use raw px; new rules should use the tokens. Do not mass-refactor the old ones
  as a side quest.
- **Company logos (2026-09-05):** the experience timeline uses real logos in `assets/logos/`
  instead of generic Font Awesome glyphs. Three constraints drove the treatment, and a future edit
  should respect them: (1) the source files are **opaque JPEGs** with their own baked-in backgrounds
  (ICONAF white, MindGigs orange, Tech Emulsion dark green) — there is no transparency to tint, so
  `.exp-logo` uses a **constant white plate in both themes**; a theme-reactive plate would just put a
  coloured square inside another coloured square. (2) The MindGigs mark is **2.1:1**, so the plate is
  a rounded **square with `object-fit: contain`**, never a circle — a circle cropped it to "M" or
  "G". (3) They arrived as `.jfif`, which GitHub Pages does not reliably serve as `image/jpeg`;
  they were re-encoded to `.jpg` capped at 256px. `alt=""` is deliberate — `.exp-company` states the
  company name immediately after, so a described logo double-announces.
- **Screenshots and client data (2026-09-20):** the Health on Point captures are real admin
  screens and were **redacted before publication** — customer names, emails and phone numbers
  covered, plus the live revenue figure on the dashboard. Health on Point is a South African
  pharmacy, so patient-linked data falls under POPIA as special personal information. Originals stay
  in `assets/health-on-point/` (unpublished, not referenced by any page); the redacted, resized
  copies live in `assets/images/projects/health-on-point-pharmacy/`. **Any future screenshot from a
  client admin panel gets the same treatment before it is wired into a gallery.** The captions name
  the redaction rather than hiding it.
- **Faizan Auto screenshots (2026-09-20):** cropped from full-desktop captures to remove browser
  chrome, the `localhost:5173` URL bar and the Windows taskbar. Originals in `assets/faizan-auto/`.
- **Contrast is a gate, not a preference (2026-09-20):** a Playwright + axe-core sweep across every
  page × 8 widths × both themes found 9 distinct WCAG AA failures, including `--color-text-muted`
  failing in *both* themes and the WhatsApp link rendering in the UA default `#0000ee`. Tokens now
  carry values that pass; `--accent-secondary-ink` exists specifically for green text on a green
  tint, and `--brand-whatsapp` for the brand green that only works on the dark ground. Re-run the
  sweep before shipping a visual change.
- **Target size (2026-09-20):** interactive controls meet the WCAG 2.2 AA 24×24 minimum. The gallery
  dots keep a 10px visual dot inside a 24px transparent button — padding the button directly drags
  its border out and turns each dot into a large ring.
- **Contact form (2026-09-20):** the Formspree endpoint `mqgvqjqj` was deleted upstream and returns
  `FORM_NOT_FOUND`, so every submission had been failing silently. `index.js` now catches any send
  failure and renders a `role="alert"` message containing a `mailto:` link pre-filled with
  everything the visitor typed, so an enquiry is never lost to a dead backend. Replaced on 2026-10-10 by form `xdeazaqr`;
  the mailto fallback stays as insurance.
- **Favicon (2026-09-20):** `favicon.svg` at the repo root, drawn from the same bracket motif as the
  `<arshad/>` wordmark. Linked from every page; the site previously had none and 404'd on every load.
- **Custom marks (2026-09-20):** ten hand-drawn SVG marks replace the Font Awesome glyphs in the
  hero and the How I Work cards, defined once as a `<symbol>` sprite after `<body>` in `index.html`
  and referenced with `<use>`. They are `currentColor` throughout, which is the point — the glyphs
  they replaced carried inline hex values that could not follow the theme (two were invisible in
  dark mode). The Skills-tab icons followed on 2026-10-10: inline hex removed, one `--accent-primary` glyph colour.
- **Hire On The Spot (2026-10-10):** ninth case study, current Tech Emulsion work (Sep 2026 —
  Present; the public site launches 12 Oct 2026), appended to the
  end of the manifest (pager ring: Faizan Auto → HOTS → Kids Learning App). Projects page only, not
  featured — the homepage keeps its 2 AI + 2 full-stack balance. No gallery until screenshots exist.
  JobFront XML work is written as *investigated*, not solved, because that is what the source says.
- **Kids Learning App ended Sep 2026:** timeline now Jan—Sep 2026, status Completed. The page
  text still says "Kids Learning App", but the gallery screenshots and the logo tile are Ludooka's
  real branding — the user confirmed on 2026-10-10 that showing it is fine.
- **Public-site screenshots (2026-10-10):** Kids Learning App and Art Gola galleries use 1600×900
  WebP captures of the clients' *public* pages (no admin data), taken headless with the scrollbar,
  cookie banner, waitlist popup and reCAPTCHA badge hidden.
- **Project logos (2026-10-10):** every project card (homepage and projects list) and every
  detail-page header shows a 256×256 tile from `assets/logos/projects/<slug>.{svg,png}` — never a
  Font Awesome glyph; the eyebrow glyph was dropped. Tiles carry their own background (both themes),
  rounded 22% in CSS with a `--color-border` hairline. Process: `.claude/skills/logo-design/`.
  **Real marks (5):** Kids Learning App = Ludooka's official PWA icon (the owl — allowed once the
  user chose to show Ludooka branding); AutoCar = **WickedFile**'s cube symbol from
  wickedfile.com's own SVG, because the dashboard is WickedFile's Executive Dashboard; Art Gola
  heart submark; Hire On The Spot (icon part of its logo, stray wordmark letter removed, on navy);
  Health on Point (cropped from the admin sidebar — no public site exists, so it is soft above
  ~110px). **Designed (4)**, because no public mark exists or the client is anonymous: Faizan Auto
  (FA monogram outlined from Saira ExtraBold Italic via fontTools, with speed lines), Auto Repair
  Shop (car on a two-post lift), LinkedIn automation (four stage dots launching a paper plane —
  indigo, never LinkedIn's #0A66C2), Multi-Agent SEO (page drafted by three linked agents ending
  in an approval check). A new project needs a tile before it ships.
- **AutoCar Intelligence screenshots (2026-10-10):** the same four captures Tech Emulsion publishes
  on its public case study (pixel-identical to the developer's own), cropped to 16:9. Shop names
  and financial figures are left as published there; customer names on the Aging WIP screen are
  blurred, in the original as well. The page links that case study from its header.
- **Pages without a gallery:** LinkedIn automation (back-end workflows, nothing to show) and HOTS.
  The gallery section and the `slider.js` tag are both omitted rather than left empty.
- **Certifications (2026-10-10):** a `#certifications` section after Experience, a `certified` row
  in the hero status panel, and `hasCredential` entries in the homepage JSON-LD. The PDFs carry no
  date or verify URL; completion months come from each PDF's creation date. The API course is
  titled "Claude with the Anthropic API" on the certificate itself, so that is the name used.
- **Health on Point originals (2026-10-10):** the records in the screenshots turned out to be test
  data (the developer's own details). The originals in `assets/health-on-point/` are now blurred
  over the same regions the published copies redacted, and are committed; the published copies were
  regenerated from them so the gallery shows blur rather than solid boxes.
- **About portrait (2026-10-10):** `assets/images/arshad-khan-portrait.webp` (896×1200, 3:4),
  an AI-assisted natural portrait the user generated and approved; the source `.jfif` is kept
  outside the repo in `../_portfolio-sources/`. The old suit photo `picture-1-protait.jpg` is
  unreferenced.
- **Team page (2026-10-10):** `/team/` ("Life at Tech Emulsion") — the user chose a separate
  page over a homepage section; it is linked from the end of How I Work. Seven curated photos from
  two Tech Emulsion evenings (team dinner; Marya Marquee), WebP at 1600px with 800px `srcset`
  variants in `assets/images/team/`. Near-duplicates and an unflattering selfie were left out; the
  2–18 MB originals live outside the repo in `../_portfolio-sources/team-photos/` (no EXIF/GPS).
  Colleagues are never named. CSS-columns photo wall so portrait and landscape shots keep their
  full frame.
- **SEO pass (2026-10-10):** titles ≤ 60 chars and descriptions 110–158 on every indexed page;
  homepage canonical/og:url now end in `/` to match the sitemap; `max-image-preview:large` robots
  meta; homepage JSON-LD is a `WebSite` + `ProfilePage` + `Person` graph (portrait as `image`,
  certifications as `hasCredential`); the projects list carries a `CollectionPage`/`ItemList`;
  every case study has its own 1200×630 social card in `assets/images/og/` (rendered from an HTML
  template — screenshot cards where screens exist, logo cards otherwise) mirrored in its
  `CreativeWork.image`; sitemap entries carry `lastmod`. **Kids Learning App is deliberately
  excluded** from all of it (user request): no new meta, no social card, not in the ItemList, and
  the real brand name appears in no text or metadata anywhere. All images are served from the repo
  — no external image URLs.
- **Live Server and SVG (2026-10-10):** VS Code Live Server injects its reload script into
  `.svg` files before the first closing svg tag. A nested `<svg>` (the WickedFile tile) therefore
  became invalid XML locally and rendered as a broken image, though GitHub Pages would have served
  it fine. Rule: one root `<svg>` per file, nesting via `<g transform>`. Every SVG was re-validated
  as Live Server serves it.
- **Mobile menu (2026-10-10):** the burger is a real `<button aria-controls aria-expanded>` (it was
  a checkbox `<label>`, unreachable by keyboard); the closed off-canvas list is
  `visibility: hidden` so Tab never lands on invisible links; Escape closes it and returns focus.
  The old `#menu-toggle:checked + .navbar ul` rule could never match and was removed.
- **AI search / GEO (2026-10-10):** `robots.txt` explicitly allows AI search and training
  crawlers (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, PerplexityBot, GPTBot, ClaudeBot,
  Google-Extended, …) and disallows all of them from the Kids Learning App page and its images;
  `llms.txt` follows the llms.txt spec (summary blockquote, key facts, case-study links) and, like
  `llms-full.txt`, contains no Kids Learning App content; the homepage has a visible,
  answer-first FAQ (native `<details>`) with a matching `FAQPage` in the JSON-LD graph, generated
  from the same text; case studies carry `article:modified_time`, `dateModified`, `abstract` and a
  `Person` author `@id` that ties every page to the one homepage entity.
- **Folder structure:** see `folder-structure.md` for the full layout. Retires all dead/orphaned pages identified in the initial audit (react.html duplicates, dsa.html, projects.html placeholder, unused CSS/JS).

---

## How to Use This Document

- Treat this as the spec to check against before adding pages, features, or dependencies.
- If a task conflicts with something here (e.g. introduces a build step, a framework, or a new font), flag it explicitly rather than silently deviating.
- Keep this file in sync: when a decision in here changes, edit this file in the same change, not as a follow-up.
