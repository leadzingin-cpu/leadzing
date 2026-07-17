"use client";

import { motion } from "framer-motion";
import { footerColumnVariants, globeRotateSlow, globeRotateTransition } from "@/animations/ctaFooterAnimations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * A minimal, futuristic globe built from plain SVG (latitude arcs +
 * an outer meridian) with two slow-orbiting rings — no external
 * imagery, so it stays crisp and on-brand at any size.
 */
export function FooterGlobeColumn() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      variants={footerColumnVariants}
      className="flex flex-col items-center text-center lg:items-end lg:text-right"
    >
      <div className="relative flex size-24 items-center justify-center sm:size-28">
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <circle cx="50" cy="50" r="34" fill="none" stroke="var(--neutral-400)" strokeOpacity="0.35" strokeWidth="1" />
          <ellipse cx="50" cy="50" rx="34" ry="12" fill="none" stroke="var(--neutral-400)" strokeOpacity="0.3" strokeWidth="0.75" />
          <ellipse cx="50" cy="50" rx="14" ry="34" fill="none" stroke="var(--neutral-400)" strokeOpacity="0.3" strokeWidth="0.75" />
          <line x1="16" y1="50" x2="84" y2="50" stroke="var(--neutral-400)" strokeOpacity="0.3" strokeWidth="0.75" />
        </svg>

        <motion.svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          aria-hidden="true"
          animate={reduceMotion ? undefined : globeRotateSlow}
          transition={globeRotateTransition}
        >
          <ellipse cx="50" cy="50" rx="46" ry="16" fill="none" stroke="var(--color-primary)" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="1 4" strokeLinecap="round" />
        </motion.svg>
        <motion.svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          aria-hidden="true"
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ ...globeRotateTransition, duration: 100 }}
        >
          <ellipse cx="50" cy="50" rx="40" ry="10" fill="none" stroke="var(--color-primary)" strokeOpacity="0.3" strokeWidth="0.75" strokeDasharray="0.5 3" strokeLinecap="round" />
        </motion.svg>
      </div>

      <p className="mt-5 max-w-[20ch] font-body text-sm leading-relaxed text-ink-500">
        Let&rsquo;s build your brand&rsquo;s next chapter.
      </p>
    </motion.div>
  );
}
