# Phase 4 — Capabilities

## What's in this package

New files:
- `animations/capabilitiesAnimations.ts`
- `components/capabilities/capabilitiesData.ts`
- `components/capabilities/widgetsData.ts`
- `components/capabilities/processData.ts`
- `components/capabilities/CapabilityCard.tsx`
- `components/capabilities/EcosystemHub.tsx`
- `components/capabilities/EcosystemDiagram.tsx`
- `components/capabilities/FloatingWidget.tsx`
- `components/capabilities/ProcessStrip.tsx`
- `components/sections/Capabilities.tsx`

Modified file (one line added, one comment moved):
- `app/page.tsx` — imports and renders `<Capabilities />` after `<TheSolution />`. Hero, InvisibleProblem, and TheSolution are untouched.

## Dependencies

None. Everything is built from packages already in your `package.json` (`framer-motion`, `lucide-react`, `next/image`) and existing assets (`/assets/logo/logo-icon.png`, `/assets/zingy/zingy-hero.png`).

## Design notes

- Reuses the site's established tokens and conventions exactly: `Container`, `SectionLabel`, `shadow-glass`/`backdrop-blur-glass`, `rounded-base`, the `ease-out-premium` curve, and the same headline/copy reveal pattern as Phase 2 and Phase 3 — nothing new was introduced at the token level.
- Zingy is the existing `zingy-hero.png` asset (unaltered, un-restyled) — reused rather than generating a new mascot render, since `zingy-solution.PNG` is already claimed by the Solution section and the brief requires the official asset, not a reinterpretation.
- The capability-card connector lines are schematic/decorative (viewBox-based, non-scaling-stroke), the same approach already used by `HubSpokeDiagram` in the Solution section — not a pixel-precise diagram, and intentionally hidden below `lg` where a stacked layout reads better than forced connectors.
- Widget copy ("Instagram Analytics" -> "Social Analytics", "Meta Ads Performance" -> "Ad Performance") was generalized slightly and icons are generic (Lucide), not platform logos, to avoid implying specific third-party branding.
- Respects `prefers-reduced-motion` throughout (idle bob and hub pulse are skipped, not just slowed).

## Verified

- `tsc --noEmit` passes for every new file (the one pre-existing error in `components/ui/Button.tsx` is unrelated to this change and was present before Phase 4).
- All Lucide icons used are confirmed present in your installed `lucide-react` version.
