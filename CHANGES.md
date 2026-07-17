# Phase 2 Delta Package — "The Invisible Problem"

Extract this into your project root, overwriting the two "updated" files
below. No new dependencies — `npm install` is NOT required for this
package; everything here runs on what Hero already installed
(Next.js, TypeScript, Tailwind, Framer Motion).

## New files (5)
```
animations/problemAnimations.ts        Scroll-reveal variants for headline, copy, hierarchy chain
components/sections/InvisibleProblem.tsx   The section itself
components/ui/GlassTypography.tsx      Reusable frosted-glass text component (the VISIBILITY word)
components/ui/SectionLabel.tsx         Monospaced eyebrow label ("THE INVISIBLE PROBLEM")
styles/glassEffects.ts                 Style constants the glass-text effect is built from
```

## Updated files (2) — replace, don't merge by hand
```
app/page.tsx           Added the <InvisibleProblem /> import + render, directly after <Hero />.
                        Nothing else in this file changed.
tailwind.config.ts     Added two tokens only: fontSize.display (104px, for the VISIBILITY
                        word) and maxWidth["container-wide"] (1400px, this section's wider
                        content area). Nothing else changed — your Hero-era tokens
                        (colors, radii, motion durations, etc.) are untouched.
```

## Naming note
The brief's example used `/components/Problem.tsx`. This ships as
`components/sections/InvisibleProblem.tsx` instead, matching the file
structure the Phase 2 spec itself requested and the `components/sections/`
convention already used for other sections in this project (Capabilities,
Process, Proof, MeetZingy, FinalCTA — built but not yet wired into
`page.tsx`, waiting on Phase 3 approval).

## After extracting
```bash
npm run dev
```
Hero is untouched — nothing in `components/hero/`, `components/layout/`,
or `components/providers/` is part of this package.
