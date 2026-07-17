# Phase 5 — The Process

## What's in this package

New files:
- `animations/processAnimations.ts`
- `components/process/processStepsData.ts`
- `components/process/metricsData.ts`
- `components/process/ProcessStepCard.tsx`
- `components/process/ProcessTimeline.tsx`
- `components/process/DashboardMockup.tsx`
- `components/process/MetricWidget.tsx`
- `components/process/ProcessShowcase.tsx`
- `components/process/ClosingStatement.tsx`
- `components/sections/TheProcess.tsx`
- `public/assets/zingy/zingy-process.png` — new mascot pose (see below)

Modified file (two lines: one import, one render call):
- `app/page.tsx` — imports and renders `<TheProcess />` after `<Capabilities />`. Hero, InvisibleProblem, TheSolution, and Capabilities are untouched.

## The new Zingy asset

The reference shows Zingy pointing at the dashboard — a pose that didn't exist yet in `/public/assets/zingy` (only the Hero's waving pose and the Solution's arms-crossed pose were there, and Capabilities already reuses the Hero pose). Rather than reuse either of those a second/third time or generate a new render, I extracted the matching official pose (Zingy holding and pointing at a phone) directly from your Zingy Mascot Reference file and added it as `zingy-process.png` — same character, same hoodie/badge/proportions/rendering, unaltered, just re-cropped to a transparent-free flat PNG for `next/image`. No redesign, no reinterpretation.

## Dependencies

None new. Same stack as Phase 4 (`framer-motion`, `lucide-react`, `next/image`).

## Design notes

- Header breaks from Phases 2–4's fully centered layout: it sits left-aligned beside the showcase, matching the reference's asymmetric top composition. Everything below (timeline, closing statement) returns to the centered rhythm used elsewhere.
- The connector path is schematic/decorative — a hand-authored bezier through approximate anchor points, drawn once on scroll-in plus a looping dashed overlay for the "flowing energy" effect, with small pulsing dots at each card. Same philosophy as `HubSpokeDiagram` (Solution) and `EcosystemDiagram` (Capabilities): expressive, not a pixel-precise diagram. Hidden below `lg`, where the timeline becomes a simple vertical stack with a static gradient rail instead.
- The dashboard mockup is an original abstract composition (line chart, stat tiles, donut, mini bar chart) in your cyan accent on a dark panel — not a screenshot or recreation of any real product's UI, and carries no third-party logos.
- Widget copy stays generic ("Social Growth" rather than a specific platform name) for the same reason.
- Respects `prefers-reduced-motion` throughout — idle bob, flowing dash, pulsing dots, and the scroll-indicator bounce all fall back to a static state.

## Verified

- `tsc --noEmit` passes for every new file (the one pre-existing error in `components/ui/Button.tsx` predates this change and is unrelated).
- All Lucide icons used are confirmed present in your installed `lucide-react` version.
- Couldn't run a full `next build` in this sandbox (no network access for the SWC binary) — run `npm run dev` once merged to confirm visually before shipping.
