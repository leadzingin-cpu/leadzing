# Booking Integration — Verification & Hardening

## Files in this package

Only two files changed — everything else in the flow was already correct
and is untouched:

- `lib/bookingApi.ts`
- `components/booking/BookingModal.tsx`

`ConfirmStep.tsx`, `Code.gs`, `Config.gs`, the Navbar/Hero/Final CTA wiring,
and every other section of the site are **not** included because they
weren't modified.

## Trace: Popup → Submit → Frontend API → Apps Script → Sheet

| Step | Where | Status |
|---|---|---|
| User clicks "Confirm Booking" | `ConfirmStep.tsx` → `onConfirm` prop | ✅ unchanged, already correct |
| Handler runs | `BookingModal.tsx` → `handleConfirm` | ✅ hardened (see below) |
| Payload built | `handleConfirm`, mapping wizard state to `BookingPayload` | ✅ verified |
| POST sent | `lib/bookingApi.ts` → `submitBooking()` | ✅ hardened (see below) |
| Backend receives + validates | `apps-script/Code.gs` → `doPost` | ✅ already correct, not modified |
| Row appended | `Code.gs` → `appendBookingRow_` | ✅ already correct |
| Response parsed | `submitBooking()` | ✅ verified |
| Success → success screen | `handleConfirm` → `goTo("success", 1)` | ✅ verified |
| Failure → inline error, retry | `handleConfirm` catch block → `ConfirmStep`'s `errorMessage` prop | ✅ verified |

## Payload field-name cross-check

`BookingPayload` (frontend) vs. `CONFIG.COLUMN_ORDER` (Apps Script) —
compared key-for-key, in order:

```
bookingDate    ↔ bookingDate     ✅
bookingTime    ↔ bookingTime     ✅
fullName       ↔ fullName        ✅
businessName   ↔ businessName    ✅
email          ↔ email           ✅
phone          ↔ phone           ✅
website        ↔ website         ✅
purpose        ↔ purpose         ✅
goals          ↔ goals           ✅
```

No mismatch found — this was already correct from the previous phase, so
no change was needed here.

## What was actually fixed / hardened this pass

Everything below is a logic-only change. No class name, layout, copy,
icon, animation, or color was touched in either file.

### 1. `lib/bookingApi.ts` — request timeout
Previously, a stalled connection (e.g. Wi-Fi drops mid-request) would
leave `fetch` pending forever — the button would stay on "Booking..."
indefinitely with no way for the visitor to know something went wrong.
Added a 15-second `AbortController` timeout with its own clear error
message ("The booking service took too long to respond..."), so every
submission now resolves one way or the other within a bounded time.

### 2. `components/booking/BookingModal.tsx` — closed the double-submit race window
The existing `isSubmitting` **state** already disabled the button, but
React state updates aren't synchronous — a very fast double-click could
theoretically fire `handleConfirm` twice before the disabled state
re-renders. Added `isSubmittingRef`, a plain ref checked and set
*immediately*, before any `await`, so a second click is rejected
regardless of render timing. This guarantees "only one booking is created
per click," which the brief calls out explicitly, rather than relying on
render timing to make it merely unlikely.

Both changes directly address requirements in the brief ("Handle network
failures," "Avoid duplicate requests," "Ensure only one booking is
created per click") that the previous implementation satisfied in the
common case but not with full certainty in edge cases.

## Success / failure behavior — confirmed as already correct

- **Success**: success screen shows (unchanged), booking data is cleared
  once the modal is closed (`Return to Website` → close → 320ms reset).
  This is deliberate, not an oversight: clearing the data *immediately*
  on success (before the step-3 exit animation finishes) would make the
  confirmation summary visibly flash to empty dashes mid-fade-out, since
  `ConfirmStep` is still animating out at that moment. Resetting after
  close avoids that visual glitch while still guaranteeing a clean form
  the next time the modal opens.
- **Failure**: modal stays open on Step 3, entered data is fully
  preserved (nothing is cleared on error), an inline error message
  appears in the same style already used for form validation errors, and
  the button re-enables so the visitor can retry immediately.
- **Duplicate prevention**: covered above — now guarded at both the
  state level (visual disable) and the ref level (logical guarantee).

## What I could not do in this sandbox

This environment has no network access, so I could not actually call
`https://script.google.com/macros/s/AKfycbyiLOVsbWm0I6mjaZtF3FmrfsIGV7T4sEtb5yx4QCyp7VwdbW40NQ9y9O8Be_wbSNwrYQ/exec`
or confirm a row lands in the live "LeadZing Leads" sheet. Please run
this once after merging:

```bash
curl -X POST "https://script.google.com/macros/s/AKfycbyiLOVsbWm0I6mjaZtF3FmrfsIGV7T4sEtb5yx4QCyp7VwdbW40NQ9y9O8Be_wbSNwrYQ/exec" \
  -H "Content-Type: text/plain;charset=utf-8" \
  -d '{"bookingDate":"2026-07-18","bookingTime":"8:00 PM","fullName":"Verification Test","businessName":"","email":"test@example.com","phone":"9999999999","website":"","purpose":"Other","goals":"End-to-end check"}'
```

Expect `{"success":true,...}` and a new row in the **Leads** tab within a
few seconds. Then do one full pass through the real modal (Navbar, Hero,
or Final CTA button → all 3 steps → Confirm) to see the loading spinner,
the success screen, and the new row together.

## Type-check

`tsc --noEmit` passes for both files (the one pre-existing, unrelated
error in `components/ui/Button.tsx` — present since Phase 4 — remains
untouched).
