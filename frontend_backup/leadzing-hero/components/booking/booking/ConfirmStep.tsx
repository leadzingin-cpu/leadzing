"use client";

import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, User, Building2, Mail, Phone, Globe2, Target, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { BookingFormData } from "./bookingData";

interface ConfirmStepProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  formData: BookingFormData;
  onBack: () => void;
  onConfirm: () => void;
  /** True while the booking is being sent to the backend. */
  isSubmitting?: boolean;
  /** Server/network error message to show above the buttons, if the last submit attempt failed. */
  errorMessage?: string | null;
}

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function ConfirmStep({
  selectedDate,
  selectedTime,
  formData,
  onBack,
  onConfirm,
  isSubmitting = false,
  errorMessage = null,
}: ConfirmStepProps) {
  const summaryRows = [
    { icon: CalendarIcon, label: "Date", value: selectedDate ? DATE_FORMATTER.format(selectedDate) : "—" },
    { icon: Clock, label: "Time", value: selectedTime ? `${selectedTime} (Asia/Kolkata)` : "—" },
    { icon: User, label: "Full Name", value: formData.fullName || "—" },
    { icon: Building2, label: "Business", value: formData.businessName || "—" },
    { icon: Mail, label: "Email", value: formData.email || "—" },
    { icon: Phone, label: "Phone", value: formData.phone || "—" },
    { icon: Globe2, label: "Website / Instagram", value: formData.website || "—" },
    { icon: Target, label: "Purpose", value: formData.purpose || "—" },
  ];

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">Confirm your details</h3>
      <p className="mt-1.5 font-body text-sm text-ink-500">
        Double-check everything looks right before you send it over.
      </p>

      <motion.ul
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mt-6 flex flex-col divide-y divide-ink/10 overflow-hidden rounded-base border border-ink/10 bg-surface-subtle/60"
      >
        {summaryRows.map((row) => {
          const Icon = row.icon;
          return (
            <li key={row.label} className="flex items-center gap-3 px-4 py-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-dark">
                <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-body text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-ink-500">
                  {row.label}
                </p>
                <p className="truncate font-body text-sm font-medium text-ink">{row.value}</p>
              </div>
            </li>
          );
        })}

        {formData.message && (
          <li className="px-4 py-3">
            <p className="font-body text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-ink-500">
              Goals
            </p>
            <p className="mt-1 font-body text-sm text-ink-700">{formData.message}</p>
          </li>
        )}
      </motion.ul>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="font-body text-sm font-medium text-ink-500 transition-colors duration-fast hover:text-ink disabled:pointer-events-none disabled:opacity-50"
        >
          &larr; Back to details
        </button>
        <div className="flex flex-col items-end gap-2">
          <Button
            type="button"
            size="lg"
            onClick={onConfirm}
            disabled={isSubmitting}
            showArrow={!isSubmitting}
            className="w-full sm:w-auto disabled:pointer-events-none disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" strokeWidth={2} aria-hidden="true" />
                Booking...
              </span>
            ) : (
              "Confirm Booking"
            )}
          </Button>
          {errorMessage && (
            <p className="font-body text-xs font-medium text-error" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
