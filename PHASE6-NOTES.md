# Phase 6 — Final CTA & Footer

## What's in this package

New files:
- `animations/ctaFooterAnimations.ts`
- `components/cta-footer/orbitServicesData.ts`
- `components/cta-footer/footerData.ts`
- `components/cta-footer/TrustRow.tsx`
- `components/cta-footer/OrbitCard.tsx`
- `components/cta-footer/MascotShowcase.tsx`
- `components/cta-footer/ClosingCTA.tsx`
- `components/cta-footer/SocialIconButton.tsx`
- `components/cta-footer/FooterBrandColumn.tsx`
- `components/cta-footer/FooterLinksColumn.tsx`
- `components/cta-footer/FooterContactColumn.tsx`
- `components/cta-footer/FooterGlobeColumn.tsx`
- `components/cta-footer/Footer.tsx`
- `components/sections/FinalCTA.tsx`

Modified file (one import, one render call):
- `app/page.tsx` — imports and renders `<FinalCTA />` after `<TheProcess />`. Nothing else in the file changed; every prior section is untouched.

No new image assets — this phase reuses `zingy-hero.png` and `logo-icon.png`, both already in your `public/assets` from earlier phases.

## Dependencies

None new. Same stack as every prior phase (`framer-motion`, `lucide-react`, `next/image`).

## Content decisions worth flagging

- **Trust row avatars**: the reference shows stock photography of people. I don't have licensed photos of real clients to use here, so I built an initials-based avatar stack (same glass/shadow treatment as everything else) instead of sourcing placeholder stock photos of real people. Swap in real client photos whenever you have them — the component (`TrustRow.tsx`) is a two-line change.
- **Footer social icons** (Column 1): Instagram, WhatsApp, YouTube only, per your explicit instruction — LinkedIn intentionally excluded.
- **Contact column** (Column 4): exactly the three rows you specified — Email (`hello@leadzing.in`), Instagram (`@leadzing.in`), WhatsApp (`+91 9874743024`) — replacing what's in the reference image, no LinkedIn.
- **"WhatsApp" icon**: Lucide doesn't ship a literal WhatsApp glyph (or any brand logos beyond a few legacy ones); used `MessageCircle` as the generic chat-icon stand-in, consistent with how the dashboard mockups elsewhere avoid real platform logos.
- **Copyright year**: set to 2026 as specified.

## Design notes

- `ClosingCTA` reuses your existing `Button` component untouched — primary variant for "Book Your Discovery Call" (with an added glow shadow via `className`, no changes to `Button.tsx` itself) and secondary variant for "See Our Process," which smooth-scrolls to `#process`.
- The mascot showcase reuses the Hero's `zingy-hero.png` pose (open raised palm) rather than introducing a new render — his hand is already open and raised, which is exactly what a hologram "floating above his palm" needs, so no new asset was necessary here (unlike Phase 5, which did need one).
- The orbit connector lines, energy rings, and hologram pulse all follow the same schematic/decorative, `prefers-reduced-motion`-aware approach used by every diagram in prior phases (Solution's hub-spoke, Capabilities' ecosystem diagram, Process's timeline) — expressive, not pixel-precise data viz.
- The globe illustration is original SVG (latitude/meridian arcs + two slow counter-rotating orbit rings) — not a stock illustration or imported asset.
- Footer is composed directly in `FinalCTA.tsx` / rendered via `page.tsx`, matching how every other section on this single-page site is assembled — it is **not** wired into `app/layout.tsx`, since that would touch a file the brief marks as locked. If you later add more routes and want the footer to persist across pages, moving `<Footer />` into the layout is a one-line follow-up.

## Verified

- `tsc --noEmit` passes for every new file (the one pre-existing error in `components/ui/Button.tsx` predates this change and is unrelated).
- All Lucide icons used are confirmed present in your installed `lucide-react` version.
- Couldn't run a full `next build` in this sandbox (no network access for the SWC binary) — run `npm run dev` once merged to confirm visually, especially the footer's column collapse at `sm`/`lg` breakpoints.
