# PROJECT_STATE.md — Single Source of Truth

**Project:** LeadZing (leadzing.in) organic search programme
**Last updated:** 2026-08-03
**Status:** Technical foundation pass complete. Blocked on owner input for content + domain decisions.

---

## 1. Business context (established)

| Fact | Value | Source |
|---|---|---|
| Business | Brand marketing agency | `README.md`, site copy |
| Location | Kolkata, West Bengal, India | `llms.txt`, Organization schema |
| Founder | Owais Raza | About modal, schema |
| Contact | hello@leadzing.in · +91 9874743024 | `footerData.ts` |
| Social | Instagram only (`@leadzing.in`) | `footerData.ts` |
| Services | 6 — brand strategy, social media mgmt, content production, website dev, AI automation, performance marketing | `capabilitiesData.ts` |
| Stack | Next.js 15 App Router, React 19, TS, Tailwind, Framer Motion | `package.json` |
| Hosting | Vercel, auto-deploy from GitHub `main` | verified via push |
| Repo | `github.com/leadzingin-cpu/leadzing` | `git remote` |
| Analytics | GA4 `G-LRHM4FBWR0` | `layout.tsx` |

**Site shape:** single page (`app/page.tsx`) composed of 7 sections. One URL in sitemap. ~1,332 rendered words.

---

## 2. Completed work

### Deploy 1 — `5f51403` (live, verified)
Fixed typo in homepage `<title>`: `Poeple` → `People`. Was live in SERPs and browser tabs.

### Deploy 2 — `cac578e` (pushed, verify live)
- **Schema:** single Organization node → `@graph` of 9 linked nodes (Organization+ProfessionalService, WebSite, Person/founder, 6× Service). Service nodes generated from `CAPABILITIES` so markup can't drift from the UI.
- **Metadata:** title retargeted `"LeadZing | Building Brands People Remember"` → `"Brand Marketing Agency in Kolkata | LeadZing"`; description rewritten to match; `keywords` array removed.
- **Sitemap:** `LAST_MODIFIED` bumped to 2026-08-03.

**Verification performed:** production build passes · both JSON-LD blocks parse · heading hierarchy unchanged (1 h1 / 8 h2 / 25 h3) · zero console errors · metadata confirmed in rendered HTML on `localhost:3001`.

### Deploy 3 — `1b3c41b` (live, verified)
`lang="en"` → `lang="en-IN"`; added the six working documents.

### Deploy 4 — `95b75c2` (live, verified)
- **GA4 booking funnel tracking** (`lib/analytics.ts` + `BookingModal` + `BookingModalContext`). Four events: `booking_modal_open`, `booking_step_advance`, `generate_lead`, `booking_submit_failed`. Helper is fail-safe (never throws, no-ops without gtag) and sends no PII. Two events verified firing on real clicks.
- **LCP fix:** removed `priority` from `AboutLeftPanel`'s logo. It sits in the always-mounted-but-hidden About modal and was emitting a `<link rel="preload">` at w=256/384 competing with `zingy-hero.png`, the real LCP element. Image preloads 3 → 2, **confirmed live in production**.

### Deploy 5 — `3b1d9e4` + `3e1e398`
- **Fixed broken footer "About" link.** It pointed at `#about`, which does not exist (About lives in a modal). Navbar already intercepted this; the footer did not. Verified: clicking now flips the dialog's `aria-hidden` and leaves `location.hash` empty.
- Meta description 168 → 143 chars so it stops truncating in SERPs.
- Added `Permissions-Policy` header.

---

## 3. 🔴 CRITICAL — awaiting owner decision

### 3.1 Fabricated performance metrics are live
`components/process/metricsData.ts` renders three "proof point" cards on the homepage:

- **Client Growth +218%**
- **Campaign Performance 98% Success Rate**
- **Website Conversion +164%**

The file's own comment reads: *"Representative proof metrics… Illustrative figures, not tied to a specific client engagement."* `widgetsData.ts` carries a similar note.

These are displayed to prospects as proof, with no disclaimer. This is the single largest EEAT liability on the site, contradicts the stated no-fake-authority policy in `StructuredData.tsx`, and is the exact pattern Google core updates target. It may also engage ASCI advertising rules in India.

**Not actioned autonomously**, because the wording is ambiguous: "representative rounding" could mean real cross-client averages (in which case deleting destroys legitimate proof) or invented numbers (in which case they must go). Only the owner knows which.

**Three options, in order of preference:**
1. Replace with real, attributable numbers + client name//permission.
2. Replace with non-numeric proof (process, capability, testimonial).
3. Remove the metric cards entirely.

Do **not** promote these figures into `aggregateRating`/`Review` schema under any circumstance — that converts a display problem into a structured-data violation with manual-action risk.

### 3.2 www vs non-www split (unresolved)
`leadzing.in` 308-redirects to `www.leadzing.in`, but every canonical signal declares non-www. Canonical currently points at a URL that redirects.

**Fix (owner, ~30 sec):** Vercel → project → Settings → Domains → set `leadzing.in` as **Primary**. All six signals then align with zero code changes. Requires Vercel dashboard access, which this agent does not have (no CLI, no token, no `.vercel` link).

---

## 4. Blocked pending owner-supplied material

| Item | Needs | Why blocked |
|---|---|---|
| 6× service pages | Real process detail, deliverables, pricing posture | Writing 800+ words/service = inventing claims about their business |
| Case studies | Real client results + permission to publish | Cannot fabricate |
| `sameAs` expansion | Actual LinkedIn / Clutch / GoodFirms URLs | Guessing produces dead links, worse than one working link |
| `LocalBusiness` completion | Street address, postal code | Not published anywhere; won't invent |
| GBP optimisation | Google Business Profile ownership | Requires owner login |
| Keyword targets | GSC + Ahrefs data | Connectors unauthorised; no volume data — refusing to invent numbers |

---

## 5. Next immediate actions

**Agent (unblocked, can proceed):**
1. ~~Build `/about` from modal content~~ — **retracted.** The About copy *is* server-rendered and indexed (`AboutModal` is deliberately never unmounted). A `/about` page would duplicate homepage content. See `CONTENT_PLAN.md` §1.1 for the corrected, smaller rationale.
2. Add `BreadcrumbList` schema once a second URL exists.
3. Image audit: `zingy-capabilities.PNG` / `zingy-solution.PNG` use uppercase `.PNG` extensions — verify no case-sensitivity issues; check file weights.
4. Convert footer service links from six anchors→`#capabilities` to real URLs once service pages exist.
5. ~~Add Permissions-Policy~~ **done** (`3e1e398`). CSP still outstanding — deliberately deferred: a wrong CSP breaks the site, and this environment cannot visually verify (see below).
6. Rename `zingy-capabilities.PNG` / `zingy-solution.PNG` to lowercase. Cosmetic only — references are consistent, so nothing is broken today.
7. Investigate 187 kB First Load JS. Framer Motion dominates; many concurrent `whileInView` + infinite-loop animations are the likely INP risk. Needs CrUX field data (blocked on GSC) to prioritise properly.

### ⚠️ Verification limits in this environment
The browser pane runs with `document.hidden === true`, so `requestAnimationFrame` is paused and **all framer-motion animations stall**. Consequences:
- Any flow gated behind an animation completing (notably `AnimatePresence mode="wait"` in `BookingModal`) will appear stuck. **This is a test artifact, not a product bug** — confirmed by measuring 0 rAF frames/sec.
- React state changes and analytics events fire normally and *can* be verified.
- Screenshots are unavailable for the same reason.

Do not diagnose animation-dependent behaviour from this environment.

**Owner (blocking):**
1. Decide on §3.1 metrics.
2. Set primary domain in Vercel (§3.2).
3. Verify GSC + Bing Webmaster Tools; submit sitemap.
4. Create + verify Google Business Profile.
5. Authorise Ahrefs/SimilarWeb connectors, or supply GSC export.

---

## 6. Decisions on record

- **Title changed from tagline-led to keyword-led.** Rationale: the tagline owns the `<h1>`; the title tag's job is query matching. Reversible in one line if the owner prefers the brand line.
- **No `SearchAction` in WebSite schema** — the site has no search feature.
- **No `aggregateRating`/`Review`** — no verified reviews exist.
- **No `streetAddress`** — not published; omitted rather than invented.
- **Pushed directly to `main`** rather than via PR, because Vercel builds production from `main` and the owner asked for changes live.

---

## 7. Files modified

| File | Change |
|---|---|
| `app/layout.tsx` | Title, description, removed `keywords` |
| `app/sitemap.ts` | `LAST_MODIFIED` bump |
| `components/StructuredData.tsx` | Rewritten as 9-node `@graph` |

Companion docs: `SEO_LOG.md` · `TECHNICAL_AUDIT.md` · `CONTENT_PLAN.md` · `SEO_ROADMAP.md` · `BACKLINK_OPPORTUNITIES.md`
