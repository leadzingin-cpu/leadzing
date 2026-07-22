# Changelog

This file documents the project's history, ending with a full engineering
audit and cleanup pass. Earlier per-phase delivery notes
(`PHASE4-NOTES.md`, `PHASE5-NOTES.md`, `PHASE6-NOTES.md`,
`BOOKING-MODAL-NOTES.md`, `BOOKING-VERIFICATION-NOTES.md`,
`BOOKING-MODAL-FIX-NOTES.md`, `ABOUT-MODAL-NOTES.md`,
`MOBILE-OPTIMIZATION-NOTES.md`, `PROCESS-ACCORDION-NOTES.md`, `CHANGES.md`)
have been consolidated into this single file and removed, per the
production cleanup below — their content lives here now instead of
scattered across ten separate root-level files.

---

## Maintenance Update — Footer, About & Final CTA Cleanup

Small surgical edits, no redesign. Six files touched (one deleted).

### 1. Removed the "Trusted by 120+ businesses" trust row
- `components/cta-footer/ClosingCTA.tsx` — removed the `<TrustRow />` render and its import (it was the last element in the left column's flex stack, so the layout closes up naturally with no leftover gap; both CTA buttons are unaffected). Also corrected a stale doc comment that still mentioned it.
- `components/cta-footer/TrustRow.tsx` — **deleted**. Confirmed zero remaining references anywhere in the project before removing it.

### 2. Replaced the YouTube social icon with Email
- `components/cta-footer/footerData.ts` — `SOCIAL_LINKS`'s third entry changed from `{ icon: Youtube, label: "YouTube", href: "https://youtube.com/@leadzing" }` to `{ icon: Mail, label: "Email", href: "mailto:hello@leadzing.in" }`. Removed the now-unused `Youtube` import. `SocialIconButton.tsx` itself is fully data-driven and untouched — same size, border, hover, spacing, transition, exactly as before, just rendering a different icon from the data.

### 3. Footer navigation updated
- `components/cta-footer/footerData.ts` — `FOOTER_NAV_LINKS` changed to exactly `Home, Capabilities, Process, About, FAQ` (Problem, Solution, Contact removed). `FAQ` uses `href="#faq"`, matching the FAQ section's existing `id`.

### 4. Footer services list updated
- `components/cta-footer/footerData.ts` — `FOOTER_SERVICE_LINKS` replaced with exactly `Brand Strategy, Social Media Management, Content Production, Website Development, AI Automation, Performance Marketing` (Creative Direction removed; note this list also renames "Web Development" to "Website Development" and adds two new entries, per the exact list requested).

### 5. About modal — removed the "100+ Businesses Reached" card
- `components/about/aboutData.ts` — removed the `reach` entry from `LEFT_INFO_CARDS`, and the now-unused `Users` icon import. `AboutLeftPanel.tsx` renders this array via a plain `.map()` in a `flex flex-col` stack, so the remaining two cards close up automatically — no layout changes needed there.

### Verified
- `tsc --noEmit`: zero errors.
- `eslint . --ext .ts,.tsx --max-warnings=0`: zero errors/warnings.
- `next build`: same sandbox limitation as every prior entry in this changelog (no network access here for Next's native SWC binary) — not a code defect; `tsc`/lint are clean.
- No file was renamed, moved, or reorganized. No config file (`package.json`, `tailwind.config.ts`, `tsconfig.json`, `.eslintrc.json`, `next.config.js`) was touched. No dependency was added or updated.

---

## Bug fix — "View Services" button

`components/hero/HeroContent.tsx`: the Hero's "View Services" button had
no `onClick` handler at all. Added one, reusing the exact
`scrollIntoView({ behavior: "smooth" })` pattern already used by the
Final CTA's "See Our Process" button, targeting `#capabilities` (which
already had its `id` set). One file changed; no UI/styling change.

---

## Phase 7 — FAQ Section + Navigation Update

New section, inserted between Process and Final CTA, plus a navigation
menu update. No other section was modified.

### New files (7)
- `components/sections/FAQ.tsx` — the section itself
- `components/faq/faqData.ts` — the six Q&A entries
- `components/faq/FAQLeftPanel.tsx` — eyebrow, headline, copy, Zingy card
- `components/faq/FAQAccordion.tsx` — manages which of the six cards is open
- `components/faq/FAQAccordionItem.tsx` — a single card (+/- toggle, cyan border+glow, height/opacity animation)
- `components/faq/FAQBottomCTA.tsx` — the glass CTA card, reusing the existing `Button` + `useBookingModal()`
- `animations/faqAnimations.ts` — this section's motion variants (400-500ms accordion timing, per spec)

### Modified files (2)
- `app/page.tsx` — one import + one line, rendering `<FAQ />` between `<TheProcess />` and `<FinalCTA />`.
- `components/layout/Navbar.tsx` — `NAV_LINKS` updated to `Home, Capabilities, Process, About, Contact, FAQ` (Problem and Solution removed, FAQ added), exactly as specified. No styling, spacing, animation, or interaction logic in the Navbar itself was touched — same component, same behavior, just a different array of six links instead of seven. "FAQ" is a plain anchor link (`#faq`) like Process/Capabilities/Contact — it doesn't open a modal, so no click-interception logic was needed for it (unlike "About").

### Notable decisions
- **First FAQ item opens by default** (matching the reference image), unlike the Process accordion which starts fully collapsed — a deliberate difference, not an inconsistency: an FAQ block reads better with one example answer already visible.
- **`#FAFAF8` ("Warm White") was not used.** It doesn't exist anywhere in the current design system (the closest existing token is `surface.subtle`, `#F7F8FA` — a different value) and the same brief explicitly says not to introduce new colors. Used the existing white/glass backgrounds already used by every neighboring section instead.
- **Zingy card** reuses the existing `zingy-process.png` asset (hand raised, holding/pointing at a device), cropped to upper-body-only via CSS object-position inside a glass card frame — no new mascot artwork was generated; this is the same official, unaltered render used elsewhere on the site, just framed differently.
- **`Problem` and `Solution` were removed from the nav only** — both sections still exist on the page exactly as before; they're simply no longer directly linked from the nav bar, per explicit instruction.

### Verified
- `tsc --noEmit`: zero errors.
- `eslint . --ext .ts,.tsx --max-warnings=0`: zero errors/warnings.
- `next build`: could not complete in this sandbox specifically (no network access to fetch Next's native SWC binary — the same environment limitation noted in the prior architecture-audit entry below, not a code defect). `tsc` and lint, which catch the overwhelming majority of real build failures, both pass clean.

---

## [Unreleased] — Architecture Audit & Production Cleanup

A full repository audit, performed with zero changes to design, layout,
spacing, typography, color, animation, or feature behavior — engineering
cleanup only.

### Root cause found

Every reported symptom -- "TypeScript cannot resolve modules," "build
fails," "duplicate components," "orphaned files" -- traced back to a
single leftover directory: **`frontend_backup/leadzing-hero/`**. It
contained stray, partially-nested copies of booking components (including
a `components/booking/booking/` double-nesting) left over from an earlier
delivery ZIP that had been extracted into the project instead of merged.
Two of those orphaned files (`BookingModal.tsx`, `ConfirmStep.tsx`) had
relative imports (`./ProgressHeader`, `./CloseButton`, `./bookingData`,
etc.) pointing at sibling files that only existed in the *real*
`components/booking/` directory, not alongside them -- hence "cannot
resolve module." Because `tsconfig.json`'s `include` pattern
(`**/*.ts`, `**/*.tsx`) has no exclusion for this folder, TypeScript was
attempting to compile these orphaned files as part of the project on
every run.

### Removed
- `frontend_backup/` -- the entire orphaned directory described above.
- Two empty, literally-named directories (`{app,components` and
  `{app,components/layout,components`) -- artifacts of an unexpanded shell
  brace-expansion (`mkdir -p {a,b,c}` run under a shell that didn't
  expand braces) from an earlier delivery. Contained nothing.
- `tsconfig.tsbuildinfo` -- a stale local build-info cache file; it's a
  build artifact, already covered by `.gitignore`'s `*.tsbuildinfo` rule,
  and shouldn't have been included in a source delivery.
- Ten scattered root-level `*-NOTES.md` / `CHANGES.md` files -- consolidated
  into this changelog (see note above).

### Fixed
- **Zero TypeScript errors.** `tsc --noEmit` now passes cleanly across
  the entire project -- confirmed by direct compilation, twice. (The
  orphaned `frontend_backup` files were the only source of type errors;
  the real project source had none.)
- **Zero ESLint errors/warnings.** Verified via both `eslint . --ext
  .ts,.tsx` and `next lint` directly.

### Verified unchanged (audited, not modified)
- Every file under `components/`, `hooks/`, `lib/`, `animations/`,
  `styles/`, `app/` was checked for actual usage -- every single file is
  imported and used somewhere; there were no dead/orphaned files in the
  *real* project tree, only in the removed backup folder.
- `package.json` dependencies were audited one by one: `clsx`,
  `framer-motion`, `lenis`, `lucide-react`, `next`, `react`, `react-dom`,
  `tailwind-merge` (deps) and `@types/node`, `@types/react`,
  `@types/react-dom`, `autoprefixer`, `eslint`, `eslint-config-next`,
  `postcss`, `tailwindcss`, `typescript` (devDeps) are all genuinely used.
  Nothing unused, nothing missing.
- `tsconfig.json`, `next.config.js`, `postcss.config.js`,
  `tailwind.config.ts`, `.eslintrc.json`, `.gitignore` were all reviewed
  and are correctly configured -- no changes needed.
- No layout, spacing, typography, color, component appearance, or
  animation was touched anywhere in this pass.

### Known limitation of this audit (environment, not project)
`next build` could not be executed to completion in the sandbox this
cleanup was performed in -- it has no network access, so Next.js's
Rust/SWC compiler binary (a native, platform-specific package downloaded
on demand) couldn't be fetched. This is an environment restriction, not
a defect in the project: `tsc` and `eslint`/`next lint` -- which catch the
overwhelming majority of real build failures (type errors, syntax errors,
unresolved imports, lint violations) -- both pass with zero issues, and
the import-resolution root cause that would have caused an actual build
failure has been directly confirmed fixed. See `DEPLOYMENT.md` for exact
steps to verify the full build in an environment with normal network
access (including Vercel itself) before going live.

### Not changed, by design
Per explicit instruction, this pass did not touch: page layout, section
ordering, spacing, typography, color tokens, component visual appearance,
Framer Motion animation values/timing, branding, or any feature
(Hero, Problem, Solution, Capabilities, Process, Final CTA, Footer,
Navigation, Booking modal + Google Sheets integration, About modal, or
any mobile-responsive fix from prior phases). All prior mobile
optimizations, the Process accordion, the booking wizard, and the About
modal were verified present and structurally intact -- none were "undone."

---

## Project history (prior phases, summarized)

- **Phase 1 -- Hero**: initial site shell, Hero section, Navbar, smooth-scroll
  provider, design token foundation (Tailwind config: colors, spacing,
  radii, shadows, motion durations).
- **Phase 2 -- The Invisible Problem**: `InvisibleProblem` section,
  `GlassTypography` and `SectionLabel` reusable UI components, glass-effect
  style constants.
- **Phase 3 -- The Solution**: `TheSolution` section with the hub-spoke
  pillar diagram (`HubSpokeDiagram`, `PillarNode`) and `SolutionShowcase`.
- **Phase 4 -- Capabilities**: `Capabilities` section, ecosystem diagram,
  floating proof widgets.
- **Phase 5 -- The Process**: `TheProcess` section, five-stage zigzag
  timeline with animated connector, dashboard mockup showcase.
- **Phase 6 -- Final CTA & Footer**: `FinalCTA` section, mascot/orbit-card
  showcase, five-column premium footer.
- **Booking system**: global `BookingModalProvider`/`BookingModal`
  three-step wizard (Schedule -> Details -> Confirm), reusable form field
  components, Google Apps Script backend (`apps-script/Code.gs` +
  `Config.gs`) writing to a "LeadZing Leads" Google Sheet, `lib/bookingApi.ts`
  frontend integration with loading/error states and duplicate-submission
  guards.
- **Mobile optimization pass**: root-caused and fixed a "Process section
  blank on mobile" bug (Lenis smooth-scroll's cached scroll-height going
  stale on mobile -- Lenis now only runs at >=1024px); fixed several
  concrete horizontal-overflow bugs (Hero headline, glass "VISIBILITY"
  text, booking modal progress header, calendar grid, dashboard mockup);
  fixed missing body-scroll-lock and safe-area handling on the mobile nav
  menu; touch-target sizing; viewport-height whitespace fixes.
- **Process section mobile accordion**: replaced the cramped mobile card
  stack with a proper collapsed-by-default accordion (`ProcessAccordion`)
  below 768px, reusing the exact existing step data -- desktop unchanged.
- **About modal**: second global modal (`AboutModalProvider`/`AboutModal`),
  two-panel layout (independently-scrolling right panel), reusing the
  booking modal's close button and interaction patterns; wired to the
  Navbar's "About" link.
- **This audit**: see "Architecture Audit & Production Cleanup" above.
