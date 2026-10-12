---
name: logo-design
description: Use when a project in this portfolio needs a logo — adding a project, replacing a placeholder glyph, or when the user asks for "real logos". Covers finding the client's real mark first, and designing a proper one (symbol + typeface outlines, SVG) only when no real mark exists or the client is anonymous.
---

# Project logos

Every project card and detail-page header shows a 256×256 tile from
`assets/logos/projects/<slug>.{svg,png}` (see `project-context.md` §8, "Project logos").
A Font Awesome glyph is never an acceptable logo.

## 1. Real mark first — always research before designing

Try, in order, and stop at the first hit:

1. The product's live site: header `<img>`/`<svg>` (prefer `.svg`), then
   `apple-touch-icon` / PWA `manifest.webmanifest` icons (512px), then `og:image`.
2. The brand shown *inside the product's own UI* (a dashboard header wordmark is the
   product's brand — e.g. the AutoCar dashboard is WickedFile's).
3. The employer's public case study (techemulsion.com/case-studies/...).
4. A screenshot of the product, cropped — last resort, and say it is soft.

Check client-naming rules first (`project-context.md` §8): anonymous clients
(LinkedIn automation, SEO system) must **not** get a real mark that identifies them.

Turning a real mark into a tile: keep the brand's own colours; if the mark is
white-on-dark, put it on the brand's dark colour; use the symbol only (no wordmark)
because the tile renders at ~56px; never redraw or "improve" a client's logo.

## 2. Designing one — only when step 1 found nothing

A designed mark must read as a brand, not an icon:

- **One idea, specific to the project.** Avoid stock metaphors that fit any app
  (gear, generic magnifier, lightbulb). Ask: what does *only this* system do?
- **Letterforms from a real typeface, outlined.** Pull glyph outlines with fontTools
  from an OFL font (google/fonts on GitHub) and write them as `<path>` data — an
  `<img>`-loaded SVG cannot load web fonts, so live `<text>` renders differently per
  device. Modify the outlines (ligature, cut, slant) so the mark is not just a font.
- **Construction:** 256 grid, 24px safe margin, optical centring (shift heavy shapes
  up ~4px), one stroke weight family, shapes snapped to whole units.
- **Colour:** one brand hue as a two-stop gradient on the tile, white mark. It must
  not collide with a real brand's identity (no LinkedIn blue "in", no Google colours).
- **Tile:** `<rect width="256" height="256" rx="56">` background baked in so the mark
  works in both themes; CSS adds the 22% radius and `--color-border` hairline.
- **Exactly one closing svg tag per file** — no nested `<svg>` (use `<g transform>`), and
  never write the closing tag's text inside a comment. VS Code Live Server injects its
  reload script before the *first* closing svg tag, which breaks any file with two.

## 3. Verify before wiring

Render all tiles on one sheet at 150px and 56px on `#f4f6f8` and `#161b26`; every mark
must be legible at 56px in both. Then run the site sweep (broken images, axe) and
update `project-context.md` §8 with where each mark came from.
