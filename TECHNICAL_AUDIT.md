# TECHNICAL_AUDIT.md

**Audited:** 2026-08-03 · leadzing.in (live) + repo at `cac578e`
**Method:** raw HTML inspection (curl), production build, local render on :3001, full source read.

Status key: ✅ pass · ⚠️ needs work · 🔴 critical · ⬜ blocked

---

## Crawlability & indexing

| Check | Status | Detail |
|---|---|---|
| robots.txt | ✅ | `Allow: /`, sitemap declared. No AI crawlers blocked. |
| Sitemap valid | ✅ | Well-formed XML, 1 URL |
| Sitemap coverage | 🔴 | **1 URL total.** Site is single-page — see `CONTENT_PLAN.md` |
| Canonical present | ✅ | `<link rel="canonical" href="https://leadzing.in">` |
| Canonical correctness | 🔴 | Points to non-www, which **308-redirects to www**. Canonical target is a redirect. |
| `robots` meta | ✅ | index,follow + `max-image-preview:large`, `max-snippet:-1` |
| JS rendering dependency | ✅ | Content is server-rendered; verified present in raw HTML without JS |
| Orphan pages | ✅ | N/A — one page |
| Redirect chains | ✅ | Single 308 hop, no chain |
| Duplicate content | ✅ | None internally |
| Keyword cannibalisation | ✅ | N/A at one page — **will become a live risk** once service pages ship |
| 404 handling | ✅ | `/_not-found` route builds |

## Security & headers

| Check | Status | Detail |
|---|---|---|
| HTTPS | ✅ | Enforced |
| HSTS | ✅ | `max-age=63072000` |
| X-Content-Type-Options | ✅ | `nosniff` |
| X-Frame-Options | ✅ | `SAMEORIGIN` |
| Referrer-Policy | ✅ | `strict-origin-when-cross-origin` |
| `poweredByHeader` | ✅ | Disabled |
| Content-Security-Policy | ⚠️ | Absent. Not an SEO factor; worth adding for hygiene. |
| Permissions-Policy | ⚠️ | Absent. Same. |

## Structured data

| Check | Status | Detail |
|---|---|---|
| Organization | ✅ | Now `Organization + ProfessionalService` |
| WebSite | ✅ | Added `cac578e` |
| Person (founder) | ✅ | Added `cac578e` |
| Service × 6 | ✅ | Added, generated from `CAPABILITIES` (drift-proof) |
| OfferCatalog | ✅ | Links services to org |
| FAQPage | ✅ | 6 questions, generated from `FAQ_ITEMS` (drift-proof) |
| BreadcrumbList | ⬜ | Meaningless at one page; add with service pages |
| LocalBusiness completeness | ⚠️ | No `streetAddress`/`postalCode` — not published anywhere |
| aggregateRating / Review | ⬜ | **Intentionally absent** — no verified reviews. Do not add. |
| SearchAction | ⬜ | **Intentionally absent** — no site search exists |
| Validation | ✅ | Both blocks parse; 9-node graph + FAQPage |

## On-page

| Check | Status | Detail |
|---|---|---|
| H1 | ✅ | Exactly 1 |
| H2 | ✅ | 8 |
| H3 | ✅ | 25 |
| Hierarchy | ✅ | No skipped levels |
| Title tag | ✅ | Retargeted to `Brand Marketing Agency in Kolkata \| LeadZing` (43 chars) |
| Meta description | ✅ | 170 chars — slightly over the ~155 display limit, will truncate; acceptable |
| Title/desc duplication | ✅ | N/A at one page |
| Open Graph | ✅ | title, description, url, siteName, locale `en_IN`, image + alt |
| Twitter Card | ✅ | `summary_large_image` |
| `lang` attribute | ✅ | `en` — consider `en-IN` |
| Semantic HTML | ✅ | `<main>`, `<section>` w/ `aria-label`, `<ul>/<li>` used correctly |
| Skip link | ✅ | Present, focus-visible |
| Word count | 🔴 | ~1,332 — thin for a commercial homepage carrying 6 services |

## Images

| Check | Status | Detail |
|---|---|---|
| `next/image` usage | ✅ | Used throughout |
| Modern formats | ✅ | AVIF + WebP configured |
| Alt text quality | ✅ | Descriptive; decorative image correctly `alt=""` |
| File extensions | ⚠️ | `zingy-capabilities.PNG`, `zingy-solution.PNG` — uppercase. Works on Vercel but fragile; rename to lowercase. |
| Explicit dimensions | ✅ | Via `next/image` — CLS protected |

## Performance (static analysis — no field data)

| Check | Status | Detail |
|---|---|---|
| First Load JS | ⚠️ | 187 kB on `/`. Framer Motion is the dominant cost. |
| Fonts | ✅ | `next/font` (Geist + Inter), `display: swap`, self-hosted — no FOIT, no external request |
| GA4 loading | ✅ | `afterInteractive` — off the critical path |
| Animation load | ⚠️ | Many concurrent `whileInView` + infinite-loop animations. Likely the main **INP** risk. |
| Reduced motion | ✅ | `usePrefersReducedMotion` respected throughout — genuinely well done |
| CWV field data | ⬜ | **Unavailable** — needs CrUX/GSC. No lab-only claims made here. |

## Analytics & conversion

| Check | Status | Detail |
|---|---|---|
| GA4 installed | ✅ | `G-LRHM4FBWR0` |
| Conversion events | 🔴 | **None.** Booking modal submissions are not tracked as GA4 events — you cannot measure what converts. |
| GSC linked | ⬜ | Not verified |
| Primary CTA | ✅ | "Book Discovery Call", modal-based, present in nav + hero + footer |
| Trust signals | 🔴 | See `PROJECT_STATE.md` §3.1 — current "proof" is self-declared illustrative figures |

---

## Priority fix list

| # | Issue | Severity | Owner | Effort |
|---|---|---|---|---|
| 1 | Fabricated metrics live on page | 🔴 | Owner decision | 10 min |
| 2 | Canonical → redirecting URL (www split) | 🔴 | Owner (Vercel) | 30 sec |
| 3 | One indexable URL | 🔴 | Agent + owner content | Weeks |
| 4 | No GA4 conversion events | 🔴 | Agent | 1 hr |
| 5 | ~~About content trapped in modal~~ **retracted — content IS server-rendered** | ✅ | — | — |
| 6 | Footer: 6 anchors → same `#capabilities` | ⚠️ | Agent (after #3) | 15 min |
| 7 | Uppercase `.PNG` extensions | ⚠️ | Agent | 10 min |
| 8 | `lang="en"` → `lang="en-IN"` | ⚠️ | Agent | 1 min |
| 9 | Missing CSP / Permissions-Policy | ⚠️ | Agent | 30 min |
| 10 | 187 kB First Load JS / INP risk | ⚠️ | Agent | Investigation |
