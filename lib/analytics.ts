/**
 * Thin, fail-safe wrapper around the GA4 `gtag` function loaded in
 * `app/layout.tsx`.
 *
 * Two guarantees matter more than the analytics themselves:
 *
 * 1. It never throws. Every call is wrapped — if gtag is missing,
 *    blocked by an ad blocker, or errors internally, the caller
 *    continues unaffected. These helpers sit directly in the booking
 *    submission path, which is the site's only lead-capture flow;
 *    a analytics failure must never cost a booking.
 * 2. It never sends PII. GA4's terms prohibit sending names, emails
 *    or phone numbers, so the booking events below deliberately carry
 *    only non-identifying metadata (step number, error class).
 */

type GtagFn = (command: string, eventName: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  try {
    window.gtag?.("event", eventName, params);
  } catch {
    // Analytics is strictly best-effort — swallow and carry on.
  }
}

/** Booking funnel events. Names kept in one place so GA4 configuration
 *  and the code can't drift apart. `generate_lead` is GA4's own
 *  recommended event name for this action, so it maps onto the standard
 *  reports without custom setup. */
export const BookingEvent = {
  ModalOpen: "booking_modal_open",
  StepAdvance: "booking_step_advance",
  Submitted: "generate_lead",
  Failed: "booking_submit_failed",
} as const;
