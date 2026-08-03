# SEO_ROADMAP.md

**Created:** 2026-08-03 · Impact ⭐1–5 · Effort E/M/H

---

## Now — blocking, owner-only

| # | Action | Impact | Effort | Why it blocks |
|---|---|---|---|---|
| 1 | **Decide on the fabricated metrics** (`PROJECT_STATE.md` §3.1) | ⭐⭐⭐⭐⭐ | E | EEAT liability sitting on the homepage. Also blocks case studies and Clutch reviews, which are the honest replacement. |
| 2 | **Set `leadzing.in` as Primary in Vercel** | ⭐⭐⭐⭐⭐ | E | Canonical currently points at a redirecting URL. Splits equity from every future link. 30 seconds. |
| 3 | **Verify GSC + Bing Webmaster Tools**, submit sitemap | ⭐⭐⭐⭐⭐ | E | Everything downstream is guesswork without it. All keyword work is blocked. |
| 4 | **Create + verify Google Business Profile** | ⭐⭐⭐⭐⭐ | M | Biggest local lever. Currently zero map-pack presence. |
| 5 | **Publish a street address** | ⭐⭐⭐ | E | Unblocks `LocalBusiness` schema + all Tier-1 citations. |

**Nothing in the roadmap below reaches full value until 1–4 are done.**

---

## Next — agent, unblocked

| # | Action | Impact | Effort | Depends on |
|---|---|---|---|---|
| 6 | Build `/about` from existing modal content | ⭐⭐⭐⭐ | M | — |
| 7 | Add GA4 conversion events on booking modal | ⭐⭐⭐⭐ | M | — |
| 8 | `lang="en"` → `lang="en-IN"` | ⭐ | E | — |
| 9 | Rename `.PNG` → `.png` | ⭐ | E | — |
| 10 | Add CSP + Permissions-Policy headers | ⭐ | M | — |
| 11 | Investigate 187 kB First Load JS / INP risk | ⭐⭐⭐ | H | #3 for field data |

**#7 deserves emphasis.** GA4 is installed but tracks no conversions. Every booking submission is currently invisible. You cannot optimise conversion rate without measuring it, and it is a prerequisite for any CRO work.

---

## Then — content, needs owner input

| # | Action | Impact | Effort | Depends on |
|---|---|---|---|---|
| 12 | Services hub `/services/` | ⭐⭐⭐ | M | — |
| 13 | 6 × service pages | ⭐⭐⭐⭐⭐ | H | Owner: deliverables, ICP |
| 14 | Repoint footer links to real URLs | ⭐⭐⭐ | E | #13 |
| 15 | 2–3 case studies | ⭐⭐⭐⭐⭐ | H | Owner: real results + permission |
| 16 | `BreadcrumbList` schema | ⭐⭐ | E | #13 |
| 17 | Kolkata local landing page | ⭐⭐⭐⭐ | M | #4, #13 |

**#13 and #15 are where the ranking actually comes from.** Items 1–12 make the site technically sound; these make it *rankable*. A technically perfect one-page site still cannot compete for six service categories.

---

## Ongoing — authority

| # | Action | Impact | Effort | Depends on |
|---|---|---|---|---|
| 18 | Tier-1 citations (GBP, Bing, LinkedIn, Justdial…) | ⭐⭐⭐⭐ | M | #5 |
| 19 | Clutch + GoodFirms + review collection | ⭐⭐⭐⭐⭐ | M | — |
| 20 | Expand `sameAs` with real profile URLs | ⭐⭐⭐ | E | #18 |
| 21 | Portfolio submissions (Behance, Awwwards…) | ⭐⭐ | M | — |
| 22 | Topic cluster: "choosing a marketing agency" | ⭐⭐⭐⭐ | H | #13 |
| 23 | Original research asset | ⭐⭐⭐⭐⭐ | H | — |
| 24 | Founder PR / podcasts | ⭐⭐⭐⭐ | M | — |

**#19 is the highest-leverage item on this table.** Clutch's verified reviews solve three problems simultaneously: a genuine authority link, real third-party proof to replace the invented metrics, and reviews that can legitimately support `Review` schema later.

---

## Realistic timeline

| Horizon | Expected state |
|---|---|
| **1 week** | Items 1–5 done. Domain consolidated, measurement live, GBP submitted. No ranking change yet — this is instrumentation. |
| **1 month** | `/about` live, conversion tracking active, Tier-1 citations placed, first service pages drafted. First GSC impression data arrives. |
| **3 months** | Service pages + 2 case studies live. Long-tail service queries and branded search begin returning impressions. Map pack presence if GBP verified. |
| **6 months** | Topic cluster maturing, review profile established, first earned editorial links. Competing on `brand marketing agency Kolkata`-class terms becomes realistic. |
| **12 months** | Research asset compounding. Topical authority across service categories. |

⚠️ **These are structural expectations, not traffic forecasts.** With no GSC baseline, no volume data, and no backlink profile visibility, any specific traffic number would be invented. Revisit once item #3 is complete.

---

## Dependency chain

```
#3 GSC ──────────► all keyword targeting, #11 field data
#1 metrics ──────► #15 case studies ──► #13 service page proof
#5 address ──────► #18 citations ─────► #20 sameAs
#4 GBP ──────────► #17 local page
#13 service pages ► #14 footer, #16 breadcrumbs, #22 clusters
#7 GA4 events ───► all CRO work
```

**Critical path to first ranking:** #3 → #13 → #15 → #22
**Critical path to local visibility:** #5 → #4 → #18 → #17
