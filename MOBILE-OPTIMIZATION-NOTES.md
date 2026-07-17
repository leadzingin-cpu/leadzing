# Mobile Optimization & Responsive Polish — Audit Report

14 files changed. Desktop (≥1024px / `lg:`) is untouched in every one of
them — every fix below is scoped with a `sm:`/`lg:` override that restores
the exact original value, or targets an element that only renders below
`lg` in the first place. No component was redesigned, replaced, or had its
visual language altered.

Also worth flagging: your uploaded project contains two stray leftover
directories at the root — `frontend/` and `apps-script/` — left over from
an earlier delivery ZIP that looks like it got extracted straight into the
project root instead of merged. They're not wired into the app (Next.js
never imports from them) and I didn't touch them, but they're dead weight
worth deleting from your real repo.

---

## The named bug: "Process section becomes a blank white area on mobile"

**Root cause found:** `components/providers/SmoothScrollProvider.tsx` was
initializing Lenis (smooth-scroll) unconditionally on every device,
including phones and tablets, with no way for it to recover from a stale
scroll-height calculation.

Lenis caches the document's scrollable height at init and on resize. On
mobile that cache goes stale easily — late-loading images/fonts, the
browser's URL bar show/hide changing the viewport height, or content
reflowing as scroll-triggered animations mount — and when it does, Lenis
caps how far it will let the page scroll *short of the real document
height*. A section positioned deep in the page (Process is the 5th of 6)
can become unreachable — which is indistinguishable, from the visitor's
side, from "the section is blank." The DOM is completely intact; the
scroll just can't get there.

**Fix:** Lenis now only initializes at `min-width: 1024px` (the site's own
`lg` breakpoint, matching the desktop/mobile split already used
everywhere else). Below that, the page uses plain native scrolling, which
has no cache to go stale — it always tracks the real content height. If
the viewport crosses 1024px at runtime (resizing a desktop browser
window, rotating a tablet), Lenis starts/stops to match. Desktop's scroll
feel is completely unchanged.

This also directly fixes a second, related risk: Lenis intercepts touch
input to drive its own scroll animation, which could fight the booking
modal's scroll lock and its internal step-content scrolling on touch
devices — "no scrolling bugs" in the booking modal, one of your explicit
checklist items, is now structurally guaranteed on mobile rather than
just "usually fine."

---

## Everything else found and fixed

### Horizontal overflow (the most severe category)

1. **Hero H1** (`HeroContent.tsx`) — single unbreakable words like
   "Remember." at a fixed 52px don't wrap and are wide enough to overflow
   a 320px screen's content width. Changed to a fluid
   `clamp(2.5rem, 10vw, 3.25rem)` — reaches the exact original 52px by
   ~520px and holds it all the way through the existing `sm:`/`lg:` tiers
   (unchanged). Only the 320-520px range is actually affected.

2. **"VISIBILITY" glass centerpiece** (`InvisibleProblem.tsx`) — same
   class of bug, worse: a 10-letter all-caps unbreakable word at a fixed
   56px, right at the edge of fitting on the smallest phones. Same fluid
   `clamp()` treatment, reaching the original 56px by ~430px.

3. **Booking modal progress header** (`ProgressHeader.tsx`) — the
   "① Schedule ⋯ ② Details ⋯ ③ Confirm" row plus the close button needs
   roughly 420px of width; a phone only has 240-350px available. This was
   the single worst overflow in the whole audit. Fixed by hiding the step
   *text* below `sm` (640px) — each step's own large heading, already
   directly below the progress bar, names the step just as clearly — and
   shrinking the connector lines. Used `sr-only`/`sm:not-sr-only` rather
   than `hidden`, so the step names stay available to screen readers on
   mobile even though they're visually hidden. `sm:` and up are restored
   to the exact original classes.

4. **Booking modal calendar** (`Calendar.tsx`) — day buttons were a fixed
   36px inside a 7-column grid; at 320px each column is only ~34px,
   so the buttons didn't fit their own cells and the rightmost column
   clipped. Changed to `aspect-square w-full max-w-9`, which fills
   whatever the grid actually gives it and caps at the original 36px
   wherever there's room (i.e., unchanged from `sm:` up).

5. **Process dashboard mockup** (`DashboardMockup.tsx`) — two fixed-pixel
   internals (a `width="120"` SVG sparkline, and 7 fixed-width bars) don't
   shrink when their parent card gets squeezed narrow in the mobile
   layout. Made the SVG responsive (CSS width instead of an HTML
   attribute, so it scales down while keeping its aspect ratio), added
   `flex-wrap`/`min-w-0` safety, and gave the bar row a bit more breathing
   room at the base tier only (`sm:` restores the original gap/width).
   Also added `min-w-0` one level up in `ProcessShowcase.tsx`, since a
   `flex-1` child needs it to actually shrink below its content's default
   minimum width — without it, even fully-responsive content inside can
   still force the row to overflow.

6. **Global safety net** (`globals.css`) — added `overflow-x: hidden` to
   `html`/`body`. Purely defensive; every section already fits within the
   viewport after the fixes above, this just guarantees nothing can force
   a horizontal scrollbar in an edge case that wasn't hand-verified.

### Overlapping / cramped decorative elements

7. **Final CTA's 8 orbit cards** (`OrbitCard.tsx`) — four cards stacked
   per side at fixed 104px width and ~85-90px vertical spacing don't have
   room to avoid overlapping once the stage shrinks to mobile width. Their
   connecting spoke-lines were *already* hidden below `sm` in the existing
   code — extended that same, already-established pattern to the cards
   themselves. The mascot/hologram/rings centerpiece stays prominent, and
   the same 8 services are already listed in the Capabilities section
   earlier on the page, so nothing is lost, just decluttered.

### Navigation

8. **Mobile menu had no body-scroll lock** (`Navbar.tsx`) — the page
   behind the open dropdown could still scroll on touch, explicitly called
   out in your Navigation checklist. Wired up the same `useLockBodyScroll`
   hook already used by the booking modal.
9. **No close-on-outside-click or ESC** — added both, reusing
   `useOnClickOutside` (also already built for the booking modal).
10. **No safe-area handling** — the fixed header's `top` offset now uses
    `max(1rem, env(safe-area-inset-top))` (and `max(1.5rem, ...)` at `sm:`)
    so it sits correctly below the notch/dynamic island on modern phones
    instead of potentially sitting under it.
11. **Hamburger button was 40px** — bumped to 44px. Zero desktop risk:
    this button only ever renders below `lg` (`lg:hidden`), so it's
    literally invisible on desktop regardless.

### Touch targets

12. **Booking modal close button** (`CloseButton.tsx`) and **footer social
    icons** (`SocialIconButton.tsx`) were 40px on every breakpoint.
    Bumped to 44px below `sm` only; `sm:size-10` restores the exact
    original 40px from tablet up, so nothing ≥640px changes.

### Whitespace / section height

13. **Hero and Problem sections** (`Hero.tsx`, `InvisibleProblem.tsx`) used
    a flat `120vh`/`110vh` minimum height on every breakpoint. On mobile,
    where content stacks into a single column, that flat viewport-height
    floor could leave a lot of empty space below shorter content — "large
    unused whitespace," one of your checklist items. Changed to
    `min-h-[100dvh]` below `lg`, with `lg:min-h-[120vh]`/`lg:min-h-[110vh]`
    restoring the exact original desktop value. `min-height` is a floor,
    not a cap, so on any phone where content is naturally taller than
    100dvh (common here), nothing changes — this only affects viewports
    where content was shorter than the old fixed floor.

### A pre-existing bug unrelated to responsiveness, fixed because it blocks your explicit "Loading state" checklist item

14. **`ConfirmStep.tsx` was missing props `BookingModal.tsx` already
    passes it** (`isSubmitting`, `errorMessage`) — a merge inconsistency
    from an earlier delivery, not something introduced by this pass. The
    practical effect: the "Booking..." spinner and inline error message
    on the Confirm step's button couldn't render at all, on any device,
    desktop included — the props they depend on didn't exist. This isn't
    a responsive issue, but it directly blocks "Loading state" and
    "Confirmation page," both explicitly named in your Booking Modal
    checklist, so I restored the props and the spinner/error UI (same
    styling as before — this exact code shipped once already, in the
    "Google Sheets Integration" delivery; it just didn't make it into
    this copy of the file). `tsc` confirms `BookingModal.tsx` and
    `ConfirmStep.tsx` now agree with each other again.

---

## Things I looked at and deliberately left alone

- **Nav links to `#about` and footer's "Selected Work" (`#work`)** — these
  anchors don't correspond to any section that exists yet. This is a
  content gap, not a mobile-responsive bug (it's identical on desktop),
  and the link list is shared verbatim between desktop and mobile nav, so
  "fixing" it would mean changing desktop content, which is out of scope
  here.
- **Solution section's pentagon hub-spoke diagram** (`HubSpokeDiagram.tsx`
  / `PillarNode.tsx`) — my measurements suggest its outer two nodes may
  clip slightly against the stage's own stated max-width at *every*
  breakpoint including desktop (the proportions don't fully resolve even
  at `lg`'s 540px stage / 124px nodes). Since it doesn't look
  mobile-specific, and desktop is locked for this pass, I didn't touch it.
  Flagging it in case it's worth a look in a future desktop-inclusive
  pass.
- **iOS Safari keyboard-viewport interaction with the fixed-position
  booking modal** — a known class of iOS quirk where `position: fixed`
  elements can misbehave when the keyboard opens. The modal's existing
  internal scroll container should let the browser's native
  "scroll focused input into view" behavior handle this in the large
  majority of cases, and I didn't have a way to verify actual on-device
  keyboard behavior from this environment, so I didn't make a speculative
  change here — worth a real-device check if you have one handy.

---

## Verification

- `tsc --noEmit` passes across the whole project (the one pre-existing,
  unrelated error in `components/ui/Button.tsx` — present since Phase 4 —
  is untouched).
- No `next build` in this sandbox (no network access for the SWC binary),
  and no way to render/screenshot actual devices here — every fix above
  is grounded in reading the actual rendered class list and doing the
  box-model math by hand (container padding, grid track widths, flex
  min-widths, font-metric estimates for the unbreakable-word cases), not
  guesswork. Please run this through real device/DevTools testing at the
  breakpoints you listed (320 through 1024) before shipping — that's the
  one thing I genuinely can't substitute for from here.
