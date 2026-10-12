# Project Detail Pages

One folder per project. GitHub Pages serves `projects/<slug>/index.html` at the
clean URL `/projects/<slug>/`, so there is no routing config and no build step —
these are plain static HTML files you can edit directly.

## Replacing the placeholder screenshots

Every gallery currently points at the same four placeholder SVGs in
`assets/images/projects/_placeholder/`. To put real screenshots on a project:

1. Create `assets/images/projects/<slug>/` and drop your images in it.
   Use `.webp` or `.png`, and aim for a **16:9** ratio (1600×900 works well) —
   the slider crops to 16:9, so anything else loses its edges.
2. Open `projects/<slug>/index.html` and find the `<ul class="gallery-track">`.
3. For each slide, change two things and nothing else:
   - `src="/assets/images/projects/_placeholder/01.svg"` → your image path
   - `<figcaption>` → what the screenshot actually shows

Slides are plain `<li>` elements. Add or delete them freely — the slider counts
whatever is in the list and builds its arrows and dots to match. One slide is
fine; it renders as a single framed image with no controls.

Keep the `alt` text descriptive. It is what a screen reader announces and what
shows if an image fails to load.

## Adding a new project

1. Add an entry to `assets/js/projects-data.js` — this is the manifest, and the
   one place that lists what exists.
2. Copy the closest existing `projects/<slug>/index.html` and edit its content.
   Update the `<title>`, `<meta name="description">`, `<link rel="canonical">`
   and the JSON-LD block — those carry the slug and will be wrong otherwise.
3. Add a card to `portfolio/portfolio.html` (and `index.html` if it should be
   one of the four featured on the homepage). The card's outer `<div>` needs the
   category class — `ai-agents`, `full-stack` or `automation` — because that is
   what the filter tabs match on.
4. Fix the prev/next links on the two neighbouring project pages so the ring
   stays closed.
5. Add the URL to `sitemap.xml`.

Run the site on localhost and check the console: `projects-data.js` warns when a
card links to a slug that is not in the manifest, which catches steps 1 and 3
going out of sync.

## Page structure

Each page runs: breadcrumb → title and meta → gallery → Overview → My Role →
Key Features → Tech Stack → Challenges & Solutions → Results → prev/next → CTA.

The Results section on every page carries a `TODO` comment. The bullets there
are deliberately qualitative, because concrete numbers should be yours rather
than invented — replace them with real metrics (users, time saved, revenue,
load times) wherever you have them.

## Screenshot status (2026-09-20)

Updated 2026-10-10. Real screenshots:

- `health-on-point-pharmacy` — 5 admin screens, personal data blurred
- `faizan-auto-pos` — 4 cropped POS screens
- `kids-learning-app` — 3 public-site captures (WebP)
- `art-gola-artist-platform` — 3 public-site captures (WebP)
- `autocar-intelligence-platform` — 4 dashboard captures (WebP, customer names blurred)

No gallery at all: `linkedin-connection-automation` and `hire-on-the-spot` — the section and the
`slider.js` tag are omitted. Still on `assets/images/projects/_placeholder/`:
`auto-repair-shop-management`, `multi-agent-seo-content-system`.

Every project also needs a logo tile at `assets/logos/projects/<slug>.svg` (or `.png`): 256×256,
with its own background so it works in both themes. It is used on the cards and in the page header.

**Before publishing any screenshot from a client system:** cover customer names, emails, phone
numbers and any revenue or financial total, and crop away browser chrome and OS taskbars. Say in the
figcaption that the image is redacted — it reads as discretion, not as something hidden.

Note the placeholder SVGs hardcode dark-theme hex values, so they render as dark blocks in light
mode. Replacing a placeholder with a real screenshot also fixes that.
