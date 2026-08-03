# CONTENT_PLAN.md

**Created:** 2026-08-03

## The core problem

LeadZing sells **six services** and gives Google **one URL**. A single page can rank for one thing: the brand name. Every service, every location, every buying-intent query is currently unaddressed.

A search for `"leadzing" marketing agency Kolkata` surfaces Moris Media, Lead Height, DigiBrood, Plan D Media and Kyptronix — not LeadZing. The organic footprint is effectively zero.

### ⚠️ Honest caveat on keyword data

**No search volume or difficulty figures appear in this document.** Ahrefs/SimilarWeb connectors are unauthorised and Search Console is not connected, so I have no volume data. Inventing numbers would be worse than omitting them.

Everything below is a **structural hypothesis based on service lines and market**, to be validated against real GSC/Ahrefs data before writing begins. Treat priority ordering as provisional.

---

## Target architecture

```
/                                          Pillar — brand + connected-system pitch
│
├── /services/                             Services hub
│   ├── /services/brand-strategy
│   ├── /services/social-media-marketing
│   ├── /services/content-production
│   ├── /services/website-development
│   ├── /services/ai-automation
│   └── /services/performance-marketing
│
├── /about                                 EEAT — founder story (CONTENT ALREADY EXISTS)
├── /work/                                 Case study index
│   └── /work/[client-slug]                Individual case studies
│
└── /blog/                                 Topical cluster support
```

---

## Phase 1 — Unblocked, no new content required

### 1.1 `/about` — **highest priority, zero fabrication risk**

`components/about/` already contains real founder content, core values, and mission copy. It renders **only inside a modal**, which Google cannot index as a page.

Existing material available:
- Founder credit: Owais Raza
- Founder statement: *"I noticed most businesses were spending money on random marketing without a clear system…"*
- Mission: *"…remove guesswork and replace it with clarity, strategy and execution."*
- 4 core values (`CORE_VALUES` in `aboutData.ts`)
- Origin: *"LeadZing was created to bridge strategy, creativity and execution…"*

**Action:** create `/about` reusing `AboutLeftPanel` / `AboutRightPanel` / `CoreValueCard`. Keep the modal for UX; the page is the indexable canonical version. Add `Person` schema (already in the graph) + `AboutPage` type.

Founder-led About pages are among the strongest EEAT assets an agency can own, and this one costs nothing but routing.

### 1.2 Services hub `/services/`
Index page linking all six. Fixes the footer problem where six distinct anchor texts all point at `#capabilities`.

---

## Phase 2 — Blocked on owner-supplied material

### 2.1 Six service pages (800–1,200 words each)

**Not written autonomously.** Each requires real detail about how LeadZing actually delivers — deliverables, timelines, tooling, engagement model. Writing that from imagination means publishing claims about the business that may be false. The repo's own `StructuredData.tsx` states a no-fake-authority policy; this respects it.

**Template per page (fill from owner input):**

| Block | Content |
|---|---|
| H1 | `[Service] in Kolkata` or `[Service] Services` |
| Intro | Problem this service solves, 2–3 sentences |
| What's included | Bulleted deliverables — **needs owner input** |
| How we do it | Map to the real 5-step process in `processStepsData.ts` ✅ available |
| Who it's for | Business type/stage — **needs owner input** |
| Timeline | FAQ says 3–8 weeks ✅ available |
| Proof | Case study link — **needs real case study** |
| FAQ | 3–5 service-specific, marked up as FAQPage |
| CTA | Book Discovery Call |

**Available now without owner input:** process steps, timeline, ownership terms ("Every final deliverable belongs entirely to you"), single-service availability, pricing posture ("no hidden costs"). That's roughly 40% of each page. The remaining 60% — deliverables, ICP, proof — must come from the owner.

### 2.2 Case studies — highest conversion value

Currently **zero**. For an agency this is the single most valuable content type: EEAT proof *and* commercial content.

Per case study: client + sector · problem · what was done · **real measurable result** · timeline · testimonial.

⚠️ Directly related to the fabricated-metrics issue in `PROJECT_STATE.md` §3.1. Real case studies are the correct replacement for invented percentages.

---

## Phase 3 — Topical authority (after Phases 1–2)

Cluster hypotheses, each a pillar + 4–6 supporting articles, all linking up to the relevant service page:

1. **Brand strategy for Indian SMBs** → positioning, brand vs marketing, naming, brand audits
2. **Social media for local businesses** → platform selection, content calendars, community, Kolkata-specific
3. **Website performance for conversion** → speed, CRO, redesign triggers, agency vs freelancer vs builder
4. **AI automation for marketing teams** → practical workflows, tooling, what to automate first
5. **Choosing a marketing agency** → comparison/BOFU content, red flags, pricing models, questions to ask

Cluster 5 is the highest commercial intent and the easiest to write honestly — it is expertise, not client claims. **Recommended starting point** once Phase 1 ships.

---

## Local SEO

Kolkata is the stated base. Currently: no GBP, no street address, no local landing page, `LocalBusiness` schema incomplete.

1. Create + verify Google Business Profile *(owner)*
2. Publish street address → completes `LocalBusiness` schema *(owner supplies, agent implements)*
3. `/kolkata/brand-marketing-agency` local landing page *(after service pages)*
4. NAP consistency across all citations *(see `BACKLINK_OPPORTUNITIES.md`)*

⚠️ Do not build city pages for cities LeadZing has no presence in. Thin duplicated location pages are a well-known core-update casualty.

---

## Internal linking rules

1. Every service page links **up** to `/services/` and **across** to 2–3 related services.
2. Every blog post links to exactly one service page with descriptive anchor text.
3. Case studies link to the service(s) used.
4. Footer service links point to real URLs — not six anchors to `#capabilities`.
5. Homepage links down to all six service pages.
6. No orphans: every page reachable within 3 clicks of `/`.
