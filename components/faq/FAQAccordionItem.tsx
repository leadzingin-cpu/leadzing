"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQItem } from "./faqData";
import {
  faqCardVariants,
  faqAnswerTransition,
  faqToggleIconTransition,
} from "@/animations/faqAnimations";

interface FAQAccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQAccordionItem({ item, isOpen, onToggle }: FAQAccordionItemProps) {
  const panelId = `faq-panel-${item.id}`;
  const buttonId = `faq-trigger-${item.id}`;

  return (
    <motion.div
      variants={faqCardVariants}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "overflow-hidden rounded-base border bg-white/80 shadow-glass backdrop-blur-glass transition-colors duration-medium ease-out-premium",
        isOpen
          ? "border-primary shadow-[0_0_0_3px_rgba(18,225,242,0.14),0_0_32px_rgba(18,225,242,0.16)]"
          : "border-white/70 hover:border-primary/40"
      )}
    >
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6 sm:py-6"
      >
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-medium",
            isOpen ? "bg-primary text-ink" : "bg-primary/10 text-primary-dark"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="minus"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={faqToggleIconTransition}
                className="flex items-center justify-center"
              >
                <Minus className="size-4" strokeWidth={2.5} aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="plus"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={faqToggleIconTransition}
                className="flex items-center justify-center"
              >
                <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        <span className="font-display text-base font-bold text-ink sm:text-lg">
          {item.question}
        </span>
      </button>

      {/*
        Always mounted (never conditionally unmounted) so every answer
        exists in the server-rendered HTML — not just whichever item is
        open — matching the FAQPage JSON-LD in FAQStructuredData and
        keeping the content crawlable by search/AI engines regardless
        of interaction state. Visibility is purely a height/opacity
        animation, same visual result as the previous AnimatePresence
        mount/unmount version.
      */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={faqAnswerTransition}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 pl-[4.25rem] font-body text-sm leading-relaxed text-ink-500 sm:px-6 sm:pb-6 sm:pl-[4.75rem]">
          {item.answer}
        </p>
      </motion.div>
    </motion.div>
  );
}
