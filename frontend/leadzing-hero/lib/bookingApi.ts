/**
 * Posts a completed booking to the Google Apps Script Web App backend
 * (see /apps-script in the deployment package for the receiving code).
 *
 * The endpoint URL is read from an environment variable rather than
 * hardcoded, so the same frontend code works against a dev/test
 * deployment and the production one just by changing `.env.local` —
 * no code change or redeploy required.
 */

export interface BookingPayload {
  bookingDate: string; // ISO date, e.g. "2026-07-18"
  bookingTime: string; // e.g. "8:00 PM"
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  purpose: string;
  goals: string;
}

export interface BookingResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const BOOKING_API_URL = process.env.NEXT_PUBLIC_BOOKING_API_URL ?? "";

export async function submitBooking(payload: BookingPayload): Promise<BookingResponse> {
  if (!BOOKING_API_URL) {
    throw new Error(
      "Booking API URL is not configured. Set NEXT_PUBLIC_BOOKING_API_URL in .env.local (see .env.local.example)."
    );
  }

  let response: Response;
  try {
    response = await fetch(BOOKING_API_URL, {
      method: "POST",
      // Google Apps Script web apps can't handle a CORS preflight (OPTIONS)
      // request the way a normal API can. Sending `Content-Type: text/plain`
      // keeps this a CORS "simple request" — no preflight is triggered — while
      // the body is still valid JSON, which the Apps Script backend parses
      // directly from the raw request text. Do not change this to
      // "application/json"; that reintroduces the preflight and the request
      // will fail silently in the browser.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Could not reach the booking service. Check your connection and try again.");
  }

  if (!response.ok) {
    throw new Error(`Booking request failed (status ${response.status}). Please try again.`);
  }

  let data: BookingResponse;
  try {
    data = (await response.json()) as BookingResponse;
  } catch {
    throw new Error("Received an unexpected response from the booking service.");
  }

  if (!data.success) {
    throw new Error(data.error || "The booking could not be saved. Please try again.");
  }

  return data;
}
