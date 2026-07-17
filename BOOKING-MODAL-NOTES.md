# Book Discovery Call — Global Booking Modal

## What's in this package

New files:
- `animations/bookingModalAnimations.ts`
- `hooks/useLockBodyScroll.ts`
- `hooks/useOnClickOutside.ts`
- `components/booking/BookingModalContext.tsx` — the provider + `useBookingModal()` hook
- `components/booking/BookingModal.tsx` — backdrop, container, step wizard state machine
- `components/booking/ProgressHeader.tsx`
- `components/booking/Calendar.tsx`
- `components/booking/TimeSlotPicker.tsx`
- `components/booking/TimezoneDisplay.tsx`
- `components/booking/ScheduleStep.tsx` (Step 1)
- `components/booking/DetailsStep.tsx` (Step 2)
- `components/booking/ConfirmStep.tsx` (Step 3)
- `components/booking/SuccessScreen.tsx`
- `components/booking/TextField.tsx`, `TextAreaField.tsx`, `SelectField.tsx` — reusable premium inputs
- `components/booking/TrustBadgesRow.tsx`
- `components/booking/CloseButton.tsx`
- `components/booking/bookingData.ts` — mock time slots, purpose options, empty form shape

Modified files (small, targeted integration edits only):
- `app/layout.tsx` — wraps the app in `<BookingModalProvider>` so the modal is available everywhere. This is the one place a global modal has to be mounted; nothing else in the file changed.
- `components/layout/Navbar.tsx` — desktop and mobile "Book Discovery Call" buttons now call `openModal()`.
- `components/hero/HeroContent.tsx` — Hero's "Book Discovery Call" button now calls `openModal()`.
- `components/cta-footer/ClosingCTA.tsx` — "Book Your Discovery Call" button now calls `openModal()`.

No visual, layout, copy, or animation changes were made to any of the four modified files beyond adding the `onClick`/import wiring — every existing className, variant, and animation is untouched.

## How to open it from anywhere else

```tsx
import { useBookingModal } from "@/components/booking/BookingModalContext";

function SomeFutureButton() {
  const { openModal } = useBookingModal();
  return <button onClick={openModal}>Book Discovery Call</button>;
}
```

Any component under `app/layout.tsx` (i.e. every page) can do this — no prop drilling, and it always opens the same single modal instance.

## One deliberate adaptation from the reference image

The reference screenshot shows the calendar and the business-details form on one screen, both visible at once. The brief's own **"Step Navigation"** section, though, explicitly specifies a 3-step wizard: **Step 1 = Schedule (calendar + time) only, Step 2 = Details (form) only, Step 3 = Confirmation**. Those two parts of the brief conflict with each other, so I followed the explicit, unambiguous written step breakdown for *behavior*, and used the reference image for *visual styling only* (calendar design, input design, button/badge styling, spacing).

Concretely:
- Step 1 shows the calendar + available times + timezone, with a **Continue** button (disabled until a date and time are picked) — not present in the static reference, but necessary for a working step 1 → step 2 transition.
- Step 2 shows the form. Its submit button is labeled **"Continue"** rather than "Book Discovery Call" — using the reference's exact button visual (gradient cyan, arrow, glow) and the trust badges directly beneath it, exactly as positioned in the reference, but relabeled so nothing claims to have booked anything before the user has actually confirmed. It advances to Step 3.
- Step 3 is the confirmation summary (date, time, every form field) with the **"Confirm Booking"** button specified in the brief's "Step Navigation" section, which triggers the success screen.

If you'd rather collapse this into a single non-wizard screen matching the reference literally, that's a smaller follow-up than rebuilding — the pieces (`Calendar`, `TimeSlotPicker`, the form fields) are already separated and reusable.

## Scope respected

- **UI only, mock data only** — `AVAILABLE_TIME_SLOTS` and `PURPOSE_OPTIONS` in `bookingData.ts` are static arrays. No API routes, no fetch calls, no backend of any kind.
- **"Confirm Booking"** transitions straight to `SuccessScreen` with no network request, per the brief.
- The calendar's date logic (today/disabled-past-dates/month navigation) is real, working front-end logic — not mocked — since it's pure UI state, not a backend integration.
- Timezone selector is genuinely non-functional (a static display), per "No functionality yet" in the brief.

## Interaction details

- Opens/closes with opacity + scale + slight upward motion (Framer Motion), backdrop blur, matching the Apple/Stripe/Linear reference feel requested.
- Closes on: **X** button, **Escape** key, or clicking outside the card.
- Body scroll is locked while open (`useLockBodyScroll`).
- Focus starts on the dialog container (`role="dialog"`, `aria-modal="true"`); all controls are reachable by Tab; visible focus rings are never suppressed, consistent with the rest of the site's accessibility rules.
- Respects `prefers-reduced-motion` (calendar hover/tap scaling, badge stagger, etc. all degrade gracefully — Framer Motion's core enter/exit transitions remain since they're essential to the modal's own visibility, not decorative).

## Verified

- `tsc --noEmit` passes for every new and modified file (the one pre-existing, unrelated error in `components/ui/Button.tsx` — present since Phase 4 — is untouched).
- All Lucide icons used are confirmed present in your installed `lucide-react` version.
- Couldn't run a full `next build` in this sandbox (no network access for the SWC binary) — run `npm run dev` after merging and click through all three CTAs (Navbar, Hero, Final CTA) plus the full wizard (including Back navigation and validation) before shipping.
