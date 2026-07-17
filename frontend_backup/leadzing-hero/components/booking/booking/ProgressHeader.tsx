"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { number: 1, label: "Schedule" },
  { number: 2, label: "Details" },
  { number: 3, label: "Confirm" },
] as const;

interface ProgressHeaderProps {
  currentStep: 1 | 2 | 3;
}

export function ProgressHeader({ currentStep }: ProgressHeaderProps) {
  return (
    <ol className="flex items-center" aria-label="Booking progress">
      {STEPS.map((step, i) => {
        const isComplete = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <li key={step.number} className="flex items-center">
            <div className="flex items-center gap-2">
              <motion.span
                animate={{
                  backgroundColor: isActive || isComplete ? "var(--color-primary)" : "var(--neutral-300)",
                  color: isActive || isComplete ? "#0A0B0C" : "var(--neutral-500)",
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex size-6 shrink-0 items-center justify-center rounded-full font-display text-[0.6875rem] font-bold"
              >
                {isComplete ? <Check className="size-3" strokeWidth={3} aria-hidden="true" /> : step.number}
              </motion.span>
              <span
                className={cn(
                  "sr-only font-body text-sm font-medium transition-colors duration-fast sm:not-sr-only sm:inline-block",
                  isActive ? "text-ink" : isComplete ? "text-ink-700" : "text-ink-500"
                )}
              >
                {step.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <span
                className="mx-2 h-px w-5 shrink-0 border-t-2 border-dotted sm:mx-3 sm:w-12"
                style={{ borderColor: isComplete ? "var(--color-primary)" : "var(--neutral-300)" }}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
