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
