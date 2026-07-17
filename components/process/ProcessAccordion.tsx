"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PROCESS_STEPS } from "./processStepsData";

/**
 * The mobile (<768px) replacement for the desktop zigzag card row.
 * Same underlying `PROCESS_STEPS` data as the row — no separate copy,
 * no rewritten content — just a different presentation: five numbered
 * rows, collapsed by default, expanding one at a time to reveal the
 * exact paragraphs that already live in each desktop card.
 *
 * Height animation uses the standard Framer Motion "measure to auto"
 * pattern (`animate={{ height: "auto" }}` inside an `overflow-hidden`
 * wrapper) rather than a hardcoded pixel value, so it stays correct
 * no matter how long any step's copy is.
 */
export function ProcessAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {PROCESS_STEPS.map((step) => {
        const isOpen = openId === step.id;
        const panelId = `process-accordion-panel-${step.id}`;
        const buttonId = `process-accordion-trigger-${step.id}`;

        return (
          <div
            key={step.id}
            className="overflow-hidden rounded-base border border-[#ECECEC] bg-white shadow-low"
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId(isOpen ? null : step.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-fast ease-out-premium hover:bg-ink/[0.02]"
            >
              <span className="flex items-center gap-4">
                <span className="font-display text-xl font-black text-primary-dark">
                  {step.number}
                </span>
                <span className="font-display text-base font-bold text-ink">
                  {step.title}
                </span>
              </span>

              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex size-8 shrink-0 items-center justify-center text-ink-500"
              >
                <ChevronDown className="size-5" strokeWidth={2} aria-hidden="true" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-3 px-5 pb-6 pt-0">
                    {step.paragraphs.map((paragraph, i) => (
                      <p key={i} className="font-body text-sm leading-relaxed text-ink-500">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
