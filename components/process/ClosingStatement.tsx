"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  closingHeadlineVariants,
  processCopyVariants,
  scrollIndicatorAnimation,
  scrollIndicatorTransition,
} from "@/animations/processAnimations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The section's closing beat — a short, confident restatement plus a
 * quiet downward cue, mirroring the design system's "Scroll
 * Indicator" component (a subtle pulse rather than an animated
 * arrow) so the page keeps inviting the visitor forward rather than
 * feeling like it has ended.
 */
export function ClosingStatement() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="mx-auto mt-20 flex max-w-[52ch] flex-col items-center text-center lg:mt-28">
      <motion.h3
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={closingHeadlineVariants}
        className="font-display text-[1.75rem] font-black leading-[1.15] tracking-[-0.01em] text-ink sm:text-4xl"
      >
        A proven process. Built for lasting growth.
      </motion.h3>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={processCopyVariants}
        transition={{ delay: 0.15 }}
        className="mt-4 font-body text-base leading-relaxed text-ink-500 sm:text-lg"
      >
        Every decision has a purpose. Every step moves your brand closer to becoming
        unforgettable.
      </motion.p>

      <motion.div
        className="mt-8 flex size-9 items-center justify-center rounded-full border border-ink/10 text-ink-500"
        animate={reduceMotion ? undefined : scrollIndicatorAnimation}
        transition={scrollIndicatorTransition}
        aria-hidden="true"
      >
        <ChevronDown className="size-4" strokeWidth={2} />
      </motion.div>
    </div>
  );
}
