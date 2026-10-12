---
name: portfolio-quality-review
description: Use when reviewing, auditing, polishing, or shipping any page in this portfolio (index.html, portfolio/**/*.html, assets/css, assets/js) — accessibility, SEO/structured data, performance, or conformance to this repo's own design-system.md and project-context.md. Trigger on requests like "review this page", "make this outstanding", "check accessibility", "audit SEO", "is this ready to ship", "polish this", or before/after adding a new page or section.
---

# Portfolio quality review

This repo already documents its own bar for "good": `project-context.md`, `design-system.md`, and
`folder-structure.md` at the repo root are the spec, not background reading. Re-read the relevant
one(s) before reviewing — a change that conflicts with them is a bug even if it looks fine in
isolation. This skill supplies the general web-standards checklists those docs don't restate
(accessibility, SEO mechanics, performance) plus a conformance pass against the docs themselves.

**Hard constraint, checked first:** this is a deliberately framework-free, build-tool-free,
preprocessor-free static site (`project-context.md` §1 — "a deliberate choice, not a gap"). Any
`package.json`, bundler config, Sass/Less file, or framework import is a violation to flag, not a
quality improvement — unless the user explicitly overrides this in the current conversation.

## How to run a review

1. Identify the file(s) in scope (changed files, or the page the user names).
2. Walk the sections below that apply — don't skip a section just because the page "looks fine";
   check the concrete criteria.
3. Report findings ranked blocker → should-fix → nice-to-have, each with a file:line reference and
   *why* it matters (not just "add alt text" — say what breaks without it). Don't narrate the whole
   checklist back to the user; report only what's actually wrong or actually confirmed clean.
4. Never claim a Lighthouse/axe score or WCAG conformance level without having actually inspected
   the markup/CSS for it — this is a static review, not a live audit tool.

## Accessibility (WCAG 2.2 AA)

- **Landmarks & headings:** one `<h1>` per page, no skipped heading levels, `<main>`/`<nav>`/`<footer>`
  used (not divs pretending to be them).
- **Skip link:** every page has a working `.skip-to-main` to its first landmark (already present on
  `index.html` — verify it survives edits, and that every other page has the same).
- **Images:** every `<img>` has meaningful `alt` (or `alt=""` if purely decorative) — never a filename
  or "image" as the alt text.
- **Color contrast:** body text ≥ 4.5:1, large text (≥24px or ≥19px bold) and UI components/icons ≥ 3:1.
  Check against the actual token values in `design-system.md` §1 for the current theme, not eyeballed.
- **Focus & keyboard:** every interactive element (links, buttons, form fields, slider controls, theme
  toggle) is reachable by Tab and has a visible focus indicator — never `outline: none` without a
  replacement.
- **Forms:** every input has a programmatically associated `<label>` (contact form especially).
- **Motion:** anything animated (scroll-fade, slider, hover transforms) respects
  `prefers-reduced-motion` per `design-system.md` §5 — instant/no-op transition when set.
- **ARIA:** only where semantic HTML can't express the role/state — prefer `<button>` over
  `role="button"`, real `<nav>` over `role="navigation"` on a div.

## SEO & structured data

Per `project-context.md` §5, this repo commits to: `robots.txt`, `sitemap.xml`, `llms.txt`,
`llms-full.txt`, and JSON-LD `Person` schema on `index.html` (extended per-project once detail pages
exist). When reviewing any page, check:

- **Title:** unique per page, ≤ ~60 characters, leads with the specific content not just the site name.
- **Meta description:** unique per page, ~120–155 characters, no truncation mid-word.
- **Canonical URL:** present, matches the page's real served URL exactly (scheme, trailing slash, host).
- **Open Graph / Twitter Card:** `og:title`, `og:description`, `og:type`, `og:url`, and **`og:image`**
  all present (an og:image is easy to forget and silently kills link-preview quality — check for it
  specifically) with a real absolute image URL; `twitter:card` matches what's available.
- **JSON-LD:** valid (parses as JSON), uses a real schema.org type (`Person` on the homepage), and the
  fields match the visible page content — structured data that contradicts the visible page is a
  spam signal to crawlers, not a free SEO boost.
- **Crawlability:** if the page is new, confirm it's reachable from `sitemap.xml` and not excluded by
  `robots.txt`; confirm internal links use real hrefs (not JS-only navigation) since content here is
  meant to stay crawlable per the "no runtime-rendered project data" decision in §8.
- **Heading/content match:** the `<h1>` and visible headings should contain the terms the meta
  title/description claim to be about — don't let them drift apart.

## Performance

- **Images:** check `assets/images/**` usage on the page — are dimensions constrained
  (`width`/`height` attributes or aspect-ratio CSS) to avoid layout shift; is `loading="lazy"` used on
  offscreen/below-the-fold images; are large source files (multi-hundred-KB PNG/JPG) actually
  necessary at that display size.
- **Fonts:** `font-display: swap` (already used for JetBrains Mono) carries to any newly added font
  per `design-system.md` §2; avoid adding another font-loading round trip for a single page.
- **Duplicate resources:** `project-context.md` §1 already flags Font Awesome being double-loaded
  (Kit script + cdnjs link) as a known issue — fix it if touching a page that has it, don't propagate
  the duplicate pattern into new pages.
- **Render-blocking:** stylesheet/script order in `<head>`; scripts that don't need to block first
  paint should be `defer`.
- **Targets, if you can reason about them from the markup/assets alone:** LCP < 2.5s, INP < 200ms,
  CLS < 0.1 — call out concretely what on the page threatens each (e.g. "hero image has no explicit
  dimensions → CLS risk"), don't just cite the numbers.

## Design-system & stack conformance

Cross-check against `design-system.md` directly rather than re-deriving rules:

- No hardcoded hex/rgb colors in component CSS outside the token definitions in §1 — if a needed
  shade is missing, that's a missing token, not a license to inline one.
- Spacing values snap to the 4px scale in §3 (`--space-*`), not arbitrary px/rem.
- Breakpoints limited to the six documented values in §6 — no ad hoc `@media` widths.
- Fira Code reserved for literal code content only; JetBrains Mono does UI chrome; Space Grotesk
  does headings — per §2.
- The terminal/bracket motif (`<` `/>`, `[ ]`, traffic-light dots) stays rare — flag if it's spreading
  onto more component types than §4's "Do's and Don'ts" allows.
- Theme values change via the `data-theme` token swap only — no component CSS branching on theme
  directly (§7).

If a review surfaces a conflict between what's asked and what these docs specify, say so explicitly
instead of silently picking one — `project-context.md`'s own usage note asks for exactly that.
