# Process Section — Mobile Accordion Redesign

## Files changed (3, all new logic in the same folder)

- `components/process/ProcessAccordion.tsx` — **new file**, the accordion itself
- `components/process/ProcessTimeline.tsx` — swaps the old fallback for the new accordion, and the breakpoint change (see below)
- `components/process/ProcessStepCard.tsx` — sizing changes explained below

No new data file — `ProcessAccordion.tsx` imports the exact same
`PROCESS_STEPS` array from `processStepsData.ts` that the desktop cards
already use. Same numbers, same titles, same paragraphs, word for word.
`processStepsData.ts` itself is untouched.

## What the accordion does

- Five rows: `01 Discovery`, `02 Strategy`, `03 Creation`, `04 Launch`,
  `05 Growth` — number in turquoise (`text-primary-dark`, the same token
  used for numbers everywhere else on the site), title in dark ink,
  white card, `#ECECEC` border, `shadow-low`, 16px corner radius
  (`rounded-base`, the site's existing radius token — within your
  requested 16-20px range).
- Collapsed by default — no body copy visible until tapped, exactly as
  specified.
- Tapping a row expands it and collapses whichever was previously open —
  state is a single `openId` value, so "only one open at a time" is
  structural, not just conventional.
- 300ms height animation (`height: 0 → "auto"`, inside an
  `overflow-hidden` wrapper — the standard, reliable Framer Motion
  pattern for animating to a content-dependent height without a layout
  jump), same easing curve used throughout the rest of the site
  (`[0.16, 1, 0.3, 1]`). Chevron rotates 180° over the same 300ms.
- Each row is a real `<button>` with `aria-expanded` and
  `aria-controls`/`role="region"` pairing, so it's fully keyboard-
  operable (Tab + Enter/Space) and announces its state correctly to
  screen readers — native-feeling in both touch and keyboard use.

## The one place I deviated slightly from the literal spec, and why

You asked for the accordion below 768px and "the existing 5-card layout
exactly as it is" at 768px and up. I did exactly that for the
**activation point** — the card row now starts at `md` (768px) instead of
`lg` (1024px) as it did before.

But the row's *internal sizing* (card width, gaps, number/title text
size) was tuned for its old minimum width of 1024px, assuming ~1300px+ of
comfortable room. Turning it on starting at 768px without adjustment
would have caused exactly the kind of overflow/clipping you're trying to
eliminate — just in the 768-1023px tablet range instead of on phones. So
I added a compact `md:` tier to `ProcessStepCard.tsx` (narrower card,
tighter gaps, slightly smaller number/title text) that **only applies in
768-1023px**, with an explicit `lg:` override that restores every one of
those values to the *exact original number* from 1024px up — width,
gap, padding, font sizes, all of it. I verified the desktop-affecting
classes (`lg:w-[260px]`, `lg:p-6`, `lg:text-2xl`, `lg:text-lg`, etc.)
match the pre-change values exactly, so 1024px and up is pixel-identical
to before.

Net effect: your literal 768px cutoff is respected, "no layout overflow"
(one of your own verification bullets) is genuinely satisfied at
768-1023px too, and desktop (1024px+) is untouched. The one honest
trade-off: at exactly 768-1023px, five cards with three paragraphs each
at ~128px width will show fairly tall cards with a lot of text wrapping
— not broken or clipped, just visually denser than true desktop. If you'd
rather the accordion cover that tablet range too instead (i.e. push the
row's start back to `lg`/1024px, matching what the codebase's *other*
sections already do for their own desktop/mobile split), that's a
one-line change — flip `md:` back to `lg:` in both files — happy to make
it if you'd prefer that after seeing it on a real tablet.

## Verified

- `tsc --noEmit` passes (same one pre-existing, unrelated error in
  `components/ui/Button.tsx` from earlier phases — untouched).
- No new dependencies — `ChevronDown` and `AnimatePresence` are already
  used elsewhere in the project (`lucide-react` and `framer-motion`,
  both already installed).
- Reused `processStepsData.ts` verbatim — zero copy changes anywhere.
- Couldn't render/screenshot this in the sandbox (no browser tooling
  here) — please click through the accordion on a real phone/DevTools
  before shipping, especially the open→close→open-a-different-one
  sequence and the 768px boundary itself.
