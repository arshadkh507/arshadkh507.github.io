---
name: portfolio-sync-project-entry
description: Use when adding a new project or editing an existing project's title, tags, description, links, or images in this portfolio. Project data is hand-duplicated across three places by deliberate design (see project-context.md §8), so a single edit made in only one place is a bug, not a partial fix. Trigger on requests like "add a new project", "update the project description/links/tags", or "I finished a new project, add it to the site".
---

# Keeping duplicated project data in sync

`project-context.md` §8 records a deliberate decision: project data (title, tags, description, links,
images) is hand-authored HTML, duplicated across three surfaces, instead of rendered at runtime from
one JSON source — because runtime-rendered content wouldn't be crawlable for the SEO/AI requirements
in §5. The accepted trade-off is that this drifts if only one copy gets updated. Treat that risk as
this skill's whole job: never consider a project add/edit done until all applicable copies match.

## The three (or four) places a project can live

1. **Homepage featured cards** — `index.html`, the Portfolio section (only for projects marked as
   featured; not every project needs to appear here).
2. **Full projects list** — `portfolio/portfolio.html`. The card's category class (`ai-agents` /
   `full-stack` / `automation`) drives the filter tabs, so it must match the manifest `category`.
3. **Project detail page** — `projects/<project-slug>/index.html`, served at the clean URL
   `/projects/<slug>/`. Overview, role, key features, tech stack, challenges/solutions, results,
   gallery, and a prev/next pager.
4. **The manifest** — `assets/js/projects-data.js`. This is the index over the pages and the
   canonical ordering; the prev/next pager cycle in every detail page must match its array order.
   It also ships a localhost-only check that warns when a card links to an unknown slug.
5. **`sitemap.xml`, `llms.txt`, `llms-full.txt`** — a new or renamed page must appear in all three.

## Procedure

1. **Find every existing copy first.** Grep the project's name *and* slug across the whole repo
   before editing anything — don't rely on memory of where it "should" be. A rename in
   particular touches the canonical, `og:url`, JSON-LD `url`, the breadcrumb, gallery `alt`
   strings, and the pager links in the two *neighbouring* pages.
2. **Decide what's changing** — title, tag list, description, tech stack, repo link, live-demo link,
   screenshots. List it explicitly; a vague "update the project" invites missing a field somewhere.
3. **Apply the same field values everywhere the project appears**, adapting *presentation* (a card
   gets a short description, a detail page gets the fuller version) but never letting *facts* diverge
   — same tech stack list, same repo URL, same tags/category used for filtering on the projects list.
4. **New project checklist**, in addition to the above:
   - Add the image(s) under `assets/images/` (or `assets/images/projects/<slug>/` per
     `folder-structure.md`'s target layout).
   - If the detail page is new, give it its own JSON-LD (`project-context.md` §5: "extend with
     appropriate schema on individual project detail pages once they exist").
   - Add it to `sitemap.xml` if a new URL was created.
   - If it should appear in the homepage's filterable/tagged project grid, make sure its tags match
     the vocabulary already used by other project tags (don't invent a new category casually).
5. **Before finishing, re-grep** the project name/slug across the repo and confirm every hit reflects
   the same update — this is the actual verification step, not optional cleanup.

If the user only asks to update one surface (e.g. "just fix the GitHub link on the homepage card"),
still point out — don't silently skip — that the same stale value likely exists on the detail page
and/or projects list, and confirm whether they want it fixed everywhere or really just the one spot.

## The pager cycle (added 2026-09-05)

Every detail page ends with a prev/next pager, and together they form a **closed cycle in
`projects-data.js` order**. This is the part most easily left broken, because the pages that break
are not the page you edited:

- **Adding** a project at the end of the array: fix `next` on the previously-last page and `prev` on
  the first page.
- **Renaming** a slug: fix `next` on the page before it and `prev` on the page after it.
- **Deleting** a project: fix `next` on the page before it and `prev` on the page after it — both
  are otherwise pointing at a 404.

Verify by walking `next` from any page all the way round and confirming you return to where you
started, having visited every project exactly once.
