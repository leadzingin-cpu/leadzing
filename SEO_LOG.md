# SEO_LOG.md

Running record of inspections, changes, rationale, and risks.

---

## 2026-08-03 — Session 1

### Inspected

**Repo:** `package.json`, `next.config.js`, `tsconfig.json`, `tailwind.config.ts`, `.eslintrc.json`, `app/` (layout, page, robots, sitemap, manifest, opengraph-image, apple-icon), all of `components/` (55 files), `lib/`, `public/`, `README.md`, `PROJECT_STRUCTURE.md`, `DEPLOYMENT.md`.

**Live site:** raw HTML via curl (not summarised — see Risk 1), `robots.txt`, `sitemap.xml`, HTTP headers, both hostnames, JSON-LD parse.

**External:** SERP check for brand + market terms.

### Changed

#### `5f51403` — title typo
`app/layout.tsx`: `"Poeple"` → `"People"`.

**Why:** live in the `<title>` tag — SERP snippet, browser tab, shared links. For an agency selling branding, a misspelling in its own tagline is a direct trust hit. `og:image:alt` already had the correct spelling, confirming it was unintentional.

**Impact:** ⭐⭐⭐⭐⭐ · **Risk:** none · **Verified:** live in ~60s, both hostnames.

#### `cac578e` — entity graph + metadata
`components/StructuredData.tsx`, `app/layout.tsx`, `app/sitemap.ts`.

1. **Schema: 1 node → 9-node `@graph`.** Added `WebSite`, `Person` (founder), 6× `Service`, `OfferCatalog`; `Organization` now also typed `ProfessionalService`; added `addressRegion`.
   **Why:** the site sells six services and declared none of them machine-readably. Service nodes are generated from the same `CAPABILITIES` array the UI renders, so markup cannot drift from the visible list — mirroring the existing `FAQStructuredData` pattern.

2. **Title retargeted.** `"LeadZing | Building Brands People Remember"` → `"Brand Marketing Agency in Kolkata | LeadZing"`.
   **Why:** the tagline already owns the `<h1>`, where it does its job. The title tag's job is query matching, and the previous one contained no keyword for a site with no rankings.
   ⚠️ **This overrides a deliberate prior decision** (commit `c35e3da` tuned this title). Flagged for owner review; reverting is one line.

3. **Description rewritten** to lead with the service + location.

4. **`keywords` array removed.** Ignored by Google since 2009; treated as a spam signal by Bing.

5. **Sitemap `LAST_MODIFIED`** → 2026-08-03.

**Impact:** ⭐⭐⭐⭐ · **Verified:** build passes · 9-node graph + FAQPage parse live in production · heading hierarchy unchanged (1/8/25) · zero console errors.

### Deliberately NOT changed

| Item | Why |
|---|---|
| `aggregateRating` / `Review` schema | No verified reviews exist. Would be a structured-data violation. |
| `SearchAction` | No site search feature exists. |
| `streetAddress` | Not published anywhere. Won't invent. |
| `sameAs` expansion | Would require guessing profile URLs. Dead links are worse than one working link. |
| Service page content | Requires real claims about the business. See Risk 2. |
| The fabricated metrics | Ambiguous whether real. See Risk 3. |
| www/non-www | Requires Vercel dashboard. No access. |

### Risks

**Risk 1 — summarising tools silently corrected the typo.**
The first WebFetch of the homepage returned the title as *"Building Brands People Remember"* — correctly spelled. The raw HTML said `Poeple`. The summarising model normalised the error away. This is likely why the typo survived so long, and it is a general warning: **verify SEO-critical strings against raw HTML, never a summariser.** All findings in this log were confirmed against raw source.

**Risk 2 — content work is genuinely blocked, not deferred.**
Six service pages and case studies are the highest-impact remaining items, and they cannot be produced without owner input on deliverables, ICP, and real results. Generating them from imagination would publish false claims — the exact failure mode the repo's own no-fake-authority policy guards against. Roughly 40% of each service page can be assembled from existing material (process steps, timelines, ownership terms); the remaining 60% needs the owner.

**Risk 3 — fabricated metrics are live. 🔴**
`metricsData.ts` renders "+218% Client Growth", "98% Success Rate", "+164% Website Conversion" as proof cards, while its own comment says *"not tied to a specific client engagement."*

Not removed autonomously: "representative rounding" may mean real cross-client averages, in which case deletion destroys legitimate proof. Only the owner can resolve it. Escalated as the top item in `PROJECT_STATE.md` §3.1 and `SEO_ROADMAP.md` #1.

**Risk 4 — title change overrides a prior deliberate decision.** See above. Flagged, reversible.

**Risk 5 — no measurement baseline.**
GSC not connected, GA4 tracks no conversion events, Ahrefs/SimilarWeb unauthorised. No before/after measurement is possible for anything shipped today. No traffic forecasts have been given, because any number would be invented.

### Remaining tasks

See `SEO_ROADMAP.md` for the full prioritised list with dependencies.

**Agent, unblocked next:** `/about` page · GA4 conversion events · `lang="en-IN"` · `.PNG` rename · CSP headers · JS bundle investigation.

**Owner, blocking:** metrics decision · Vercel primary domain · GSC/Bing verification · GBP creation · street address.
