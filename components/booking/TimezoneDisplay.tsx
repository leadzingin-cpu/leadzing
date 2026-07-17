"use client";

import { Globe, ChevronDown } from "lucide-react";
import { TIMEZONE_LABEL } from "./bookingData";

/**
 * Visual only, per the brief ("No functionality yet") — a real
 * timezone picker will land alongside the calendar-availability
 * backend integration in the next phase.
 */
export function TimezoneDisplay() {
  return (
    <button
      type="button"
      disabled
      className="flex w-full items-center gap-2 rounded-base border border-ink/10 bg-white px-3.5 py-2.5 font-body text-sm text-ink-700 shadow-low disabled:cursor-default"
    >
      <Globe className="size-4 shrink-0 text-ink-500" strokeWidth={2} aria-hidden="true" />
      <span className="flex-1 text-left">{TIMEZONE_LABEL}</span>
      <ChevronDown className="size-4 shrink-0 text-ink-500" strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
