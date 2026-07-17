"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { TextField } from "./TextField";
import { TextAreaField } from "./TextAreaField";
import { SelectField } from "./SelectField";
import { TrustBadgesRow } from "./TrustBadgesRow";
import type { BookingFormData } from "./bookingData";
import { PURPOSE_OPTIONS } from "./bookingData";

interface DetailsStepProps {
  formData: BookingFormData;
  onChange: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
  onBack: () => void;
  onContinue: () => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DetailsStep({ formData, onChange, onBack, onContinue }: DetailsStepProps) {
  const [attempted, setAttempted] = useState(false);

  const errors = {
    fullName: !formData.fullName.trim(),
    email: !formData.email.trim() || !EMAIL_PATTERN.test(formData.email),
    phone: !formData.phone.trim(),
    purpose: !formData.purpose,
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    if (!hasErrors) onContinue();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
        Tell us about your business
      </h3>
      <p className="mt-1.5 font-body text-sm text-ink-500">
        Just a few details before we schedule your strategy call.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <TextField
          label="Full Name"
          required
          value={formData.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          aria-invalid={attempted && errors.fullName}
          className={attempted && errors.fullName ? "border-error/60" : undefined}
        />

        <TextField
          label="Business Name"
          value={formData.businessName}
          onChange={(e) => onChange("businessName", e.target.value)}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            aria-invalid={attempted && errors.email}
            className={attempted && errors.email ? "border-error/60" : undefined}
          />
          <TextField
            label="Phone Number"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            aria-invalid={attempted && errors.phone}
            className={attempted && errors.phone ? "border-error/60" : undefined}
          />
        </div>

        <TextField
          label="Website / Instagram"
          value={formData.website}
          onChange={(e) => onChange("website", e.target.value)}
        />

        <SelectField
          label="Purpose of the call"
          required
          options={PURPOSE_OPTIONS}
          value={formData.purpose}
          onChange={(value) => onChange("purpose", value)}
        />

        <TextAreaField
          label="Tell us about your business and your goals"
          placeholder="What are you trying to achieve with your brand?"
          value={formData.message}
          onChange={(e) => onChange("message", e.target.value)}
        />
      </div>

      {attempted && hasErrors && (
        <p className="mt-3 font-body text-xs font-medium text-error">
          Please fill in all required fields marked with *.
        </p>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mt-6">
        <Button type="submit" size="lg" className="w-full">
          Continue
        </Button>
      </motion.div>

      <div className="mt-6">
        <TrustBadgesRow />
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-6 font-body text-sm font-medium text-ink-500 transition-colors duration-fast hover:text-ink"
      >
        &larr; Back to schedule
      </button>
    </form>
  );
}
