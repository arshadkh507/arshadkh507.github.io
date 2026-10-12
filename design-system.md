# Design System — Arshad Khan Portfolio (Initial Draft)

> Developer/code aesthetic: dark-first, monospace-forward, syntax-inspired accents used sparingly and semantically. Tokens carry the exact values; the prose next to each carries the *why*. This is a living document — refine as pages get built and real usage surfaces gaps.

**Last updated:** 2026-08-04

---

## Overview

Three background steps (canvas → surface → elevated) give depth without decorative shadows. Accent colors borrow roles from syntax highlighting (keyword/string/function/variable/error) so they read as "code," not "brand palette." Every token is named for its *role*, not its color, so the light/dark swap in §7 is a value change only — never a markup change.

---

## 1. Color System

```css
/* ===== Dark theme — primary/default ===== */
:root,
[data-theme="dark"] {
  --color-bg-canvas:    #0a0e14;  /* page background */
  --color-bg-surface:   #10141c;  /* cards, sections */
  --color-bg-elevated:  #161b26;  /* code containers, modals, dropdowns */
  --color-border:       #232936;
  --color-border-strong:#2f3646;  /* hover/focus state */
  --color-overlay:      rgba(10,14,20,0.72); /* nav blur, modal scrim */

  --color-text-primary:   #e6edf3;
  --color-text-secondary: #9aa5b1;
  --color-text-muted:     #5c6773; /* captions, timestamps, comment-style text */

  /* Syntax-inspired accents */
  --accent-primary:   #c792ea; /* keyword — brand/CTA */
  --accent-secondary: #7ee787; /* string — success, secondary actions */
  --accent-link:      #58a6ff; /* function — links, interactive */
  --accent-highlight: #e3b341; /* variable — badges, emphasis */
  --accent-danger:    #f47067; /* error state */
}

/* ===== Light theme — override ===== */
[data-theme="light"] {
  --color-bg-canvas:    #fafbfc;
  --color-bg-surface:   #ffffff;
  --color-bg-elevated:  #f4f6f8;
  --color-border:       #e2e5e9;
  --color-border-strong:#c9ced6;
  --color-overlay:      rgba(255,255,255,0.75);

  --color-text-primary:   #1c2128;
  --color-text-secondary: #4b5563;
  --color-text-muted:     #8b95a1;

  /* Same roles, deepened for AA contrast on white */
  --accent-primary:   #8250df;
  --accent-secondary: #1a7f37;
  --accent-link:      #0969da;
  --accent-highlight: #9a6700;
  --accent-danger:    #cf222e;
}
```

**Usage:**
```css
.card { background: var(--color-bg-surface); border: 1px solid var(--color-border); }
.card:hover { border-color: var(--accent-primary); }
```
Never hardcode a hex in a component rule — if a needed shade isn't a token, that's a sign the token set is missing something, not a reason to inline a color.

---

## 2. Typography

Pairing logic: **Space Grotesk** carries voice (headings). **JetBrains Mono** carries UI chrome (nav, labels, buttons, badges — this is what makes the site feel like a dev tool). **Fira Code** is reserved only for literal code content (its ligatures are wasted anywhere else).

```css
:root {
  --font-display: "Space Grotesk", sans-serif;
  --font-mono:    "JetBrains Mono", monospace;  /* UI: nav, buttons, labels, badges */
  --font-code:    "Fira Code", monospace;       /* code content only */

  --fw-regular: 400;
  --fw-medium:  500;
  --fw-semibold:600;
  --fw-bold:    700;

  --leading-tight:   1.2;  /* headings */
  --leading-normal:  1.5;  /* body */
  --leading-relaxed: 1.7;  /* long-form copy */

  /* Fluid scale — clamp(min, preferred, max) */
  --text-xs:      clamp(0.75rem, 0.72rem + 0.15vw, 0.8rem);    /* captions, meta */
  --text-sm:      clamp(0.875rem, 0.84rem + 0.2vw, 0.95rem);   /* labels, tags */
  --text-base:    clamp(1rem, 0.96rem + 0.2vw, 1.0625rem);     /* body */
  --text-md:      clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem);  /* lead paragraphs */
  --text-lg:      clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem);    /* h3 */
  --text-xl:      clamp(1.75rem, 1.5rem + 1vw, 2.25rem);       /* h2 */
  --text-2xl:     clamp(2.25rem, 1.8rem + 1.8vw, 3rem);        /* h1 */
  --text-display: clamp(2.75rem, 2rem + 3vw, 4.5rem);          /* hero */
}
```

**Usage:**
```css
h1 { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: var(--fw-semibold); }
nav a { font-family: var(--font-mono); font-size: var(--text-sm); }
.code-block { font-family: var(--font-code); }
```

---

## 3. Spacing System

Single 4px unit, numeric naming (`--space-4`, not `--space-md`) — deliberately code-like. Every gap/padding/margin should resolve to one of these, no arbitrary values.

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
}
```

| Use | Token |
|---|---|
| Icon-to-label gap, tag padding | `--space-2` |
| Card internal padding (mobile) | `--space-4` – `--space-5` |
| Card internal padding (desktop) | `--space-6` – `--space-8` |
| Section vertical rhythm | `--space-16` – `--space-24` |

**Usage:**
```css
.tag { padding: var(--space-1) var(--space-3); }
.section { padding-block: var(--space-20); }
```

---

## 4. UI Components

Supporting shape/elevation tokens:

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 999px;

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.4);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.35);
  --shadow-glow-primary: 0 0 0 1px var(--accent-primary), 0 0 24px rgba(199,146,234,0.22);
}
```

- **Navbar** — sticky, `--color-overlay` + `backdrop-filter: blur()` on scroll. Labels in `--font-mono`/`--text-sm`. Active item marked with an `--accent-primary` underline, not a background fill.
- **Project cards** — `--color-bg-surface`, 1px `--color-border`, `--radius-md`. Hover: border → `--accent-primary`, `translateY(-2px)`, `--shadow-glow-primary`. A small monospace meta line above the title (e.g. `$ stack: react, node, mongo`) reinforces the terminal motif.
- **Buttons** — Primary: filled `--accent-primary`, `--font-mono`, `--radius-sm`. Secondary: 1px border, transparent fill. Ghost/link: text-only, bracket motif on hover (`::before`/`::after` inject `<` `/>`) — one controlled recurring gesture, not scattered everywhere.
- **Tags / tech badges** — pill or bracket style (`[ React.js ]`), `--font-mono`, `--text-xs`, `--radius-full` or `--radius-sm`, background = accent at low opacity via `color-mix()` rather than a solid fill.
- **Code-style containers** — "editor window" motif: traffic-light chrome, optional filename tab, `--color-bg-elevated` body, `--font-code` for actual content. Reserve for places that benefit from the metaphor (skills panel, snippet showcase) — overuse dilutes it into wallpaper.

---

## 5. Animation Principles

Animate `transform`/`opacity` only — never layout properties — for compositor-only, jank-free motion. Every animated element respects `prefers-reduced-motion`.

```css
:root {
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out:      cubic-bezier(0, 0, 0.2, 1);
}
```

- **Hover effects:** lift + glow, `scale` capped at 1.02–1.05. Border-color transitions use `--duration-fast`; transform/shadow use `--duration-base`.
- **Scroll animations:** fade-up on entry (`opacity 0→1`, `translateY(20px→0)`) via IntersectionObserver — standardize timing to `--duration-slow` / `--ease-out`, stagger siblings by ~60-80ms.
- **Slider behavior:** crossfade or transform-based slide (not `left`/`top`), pause-on-hover/focus, dot indicators in `--accent-primary`, keyboard arrow-key support, instant transitions when `prefers-reduced-motion: reduce` is set.

**Usage:**
```css
.fade-in { opacity: 0; transform: translateY(20px); transition: opacity var(--duration-slow) var(--ease-out), transform var(--duration-slow) var(--ease-out); }
.fade-in.animate-in { opacity: 1; transform: translateY(0); }
```

---

## 6. Layout System

Breakpoints are a **documented scale**, used as literal values in `@media` — CSS custom properties don't work inside media-query conditions.

**Consolidated 2026-09-04** — the stylesheet previously used 13 ad-hoc widths (300/430/480/500/520/550/600/650/767/768/800/900/992). It now uses only `480`, `768`, `992`, plus `767` as the deliberate `max-width` complement of `min-width: 768` (pairing them prevents both rules matching at exactly 768px). Direction of each snap was chosen per rule, not by nearest value: the burger-menu switch moved 900 → **992** (snapping down risked the full desktop nav overflowing between 769 and 900), layout stacking moved 800/650/600 → **768**, and small-screen type/padding moved 550/520/500/430 → **480**. A `max-width: 300px` block was deleted outright as dead code — it styled `.hero-image img`, which is already `display: none` at that width.

| Reference name | Value | Target |
|---|---|---|
| `bp-sm` | 480px | large phones |
| `bp-md` | 768px | tablets |
| `bp-lg` | 992px | small desktop |
| `bp-xl` | 1200px | desktop |
| `bp-2xl` | 1440px | large desktop |

**Implemented** in `assets/css/index.css`. One content column for the whole site — every container derives from it, so nothing can drift out of alignment again:

```css
:root {
  --container-max:     1200px; /* the content column: navbar, sections, cards */
  --container-content: 1100px; /* prose readability cap on detail pages */
  --container-narrow:  720px;  /* single-column reading */
  --container-gutter:  16px;   /* viewport side padding */
}
@media (min-width: 768px) {
  :root { --container-gutter: 32px; }
}
```

Apply it as a single declaration — `min()` keeps the gutter at every width, so no separate mobile margin rule is needed:

```css
width: min(var(--container-max), 100% - 2 * var(--container-gutter));
margin-inline: auto;
```

`--container-max` is 1200px rather than the 1440px originally drafted, because the navbar and hero were already built at 1200 and matching them avoided a jarring re-flow of every existing section.

**Full-bleed backgrounds:** the page pattern belongs on `<body>` (it propagates to the canvas and spans the viewport at full scroll height); `main` is transparent and full-width. A section that wants an edge-to-edge band sets its own `background` and keeps its `.section-container` capped — never put a background on a width-capped ancestor, which is what produced the boxed-pattern bug fixed on 2026-09-04.

**Grid rules:**
```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-6);
}
```

---

## 7. Theme System

Every component references *role* tokens (`--color-bg-surface`, `--accent-primary`), not raw values — theme switching is a variable-swap at the root, no component CSS branches on theme.

```html
<html data-theme="dark"> <!-- toggled to "light" by JS -->
```
```js
const saved = localStorage.getItem('theme');
const theme = saved ?? (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
document.documentElement.dataset.theme = theme;
```
Dark is the default served theme; light is opt-in and persisted. Replaces the current `.light`/`.dark` classes that call invalid `lighten()`/`darken()` — those never worked; this system needs no preprocessor since every value is pre-computed per theme.

---

## Do's and Don'ts

- **Do** add new colors as a new *role* token in both theme blocks at once — never a one-off hex in a component.
- **Do** keep Fira Code exclusive to real code content; JetBrains Mono does the "developer feel" work everywhere else.
- **Don't** let the bracket/terminal motif (`<` `/>`, `[ ]`, traffic-light dots) appear on more than one or two component types — it's a signature, not a pattern to repeat everywhere.
- **Don't** introduce a breakpoint outside the six-value scale in §6 without a documented reason.

---

## Changelog

**2026-09-05 — hero portrait removed.** The `.hero-image img` rule referenced in §6 is gone along
with the portrait it styled. The hero's right column is now `.hero-status`, a static terminal-styled
`<dl>` of current role / focus / stack / agent tooling / availability. It reuses the chrome of the
old `.hero-boot` typing widget, which was deleted rather than kept alongside it: two terminal cards
in one viewport is exactly what the Don'ts warn against, and the boot widget's content was
JS-injected and `aria-hidden`, so neither crawlers nor screen readers ever received it. The page now
has no hero animation; the scroll reveal is the remaining motion.

**2026-09-05 — spacing tokens declared.** §3's `--space-*` scale existed only in this document. It is
now declared in `assets/css/index.css`. New rules use it; pre-existing raw-px rules were left alone.
