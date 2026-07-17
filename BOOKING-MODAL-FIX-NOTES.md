# Booking Modal — Confirm Step Overflow Fix

## What changed

One file: `components/booking/BookingModal.tsx` — the modal shell only.
`ScheduleStep.tsx`, `DetailsStep.tsx`, `ConfirmStep.tsx`, `ProgressHeader.tsx`, and everything else are untouched.

## The fix

The modal card is now a bounded, three-part flex column instead of one unbounded block:

- **Card**: `max-h-[85vh] sm:max-h-[88vh]`, `flex flex-col`, `overflow-hidden` — the card itself can never exceed the viewport, on any step.
- **Header** (progress indicator + close button): `shrink-0` — stays pinned at the top, never scrolls, never compresses.
- **Body** (the step content): `flex-1 min-h-0 overflow-y-auto overflow-x-hidden` — this is the one part that scrolls, and only when a step's content (like Confirm, with its 8-row summary) is taller than the available space.

All padding values are identical to before (`px-6/8/10`, `py`/`pb`/`pt-6/8/10`) — they're just now split between the fixed header and the scrollable body instead of living on one outer wrapper, so the visual spacing, corner radius, shadow, border, and glow are pixel-identical to what was already approved. No typography, color, icon, card, animation, or button style changed.

## Why this approach

Of the four options in the brief, this is the "modal body becomes scrollable while the header stays fixed" one. It fixes the bug for every step (not just Confirm) with a single, small change, works identically on desktop and mobile since it's driven by `vh` + flexbox rather than a fixed pixel height, and needed no edits to any step's own content — so Schedule and Details, which you said are perfect, are guaranteed byte-for-byte unchanged.

## Verified

- `tsc --noEmit` passes (same one pre-existing, unrelated error in `components/ui/Button.tsx` as before — untouched).
- Confirm step's summary rows + "Confirm Booking" button now scroll into view within the card on short viewports instead of being pushed past the bottom edge.
- No horizontal scroll: `overflow-x-hidden` added to the body alongside `overflow-y-auto`.
