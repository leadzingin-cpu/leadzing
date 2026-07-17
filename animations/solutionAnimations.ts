import type { Variants, Transition } from "framer-motion";

/**
 * Headline lines — identical rise + blur-to-sharp treatment as
 * `problemAnimations.ts`, kept as a section-local copy (rather than a
 * shared import) so Phase 2 and Phase 3 can be tuned independently
 * without accidentally coupling the two sections together.
 */
export const solutionHeadlineLineVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const solutionCopyVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * The five pillar nodes in the hub-spoke diagram — consumed via a
 * shared parent `staggerChildren` (see `pillarContainerVariants`) so
 * they appear in a deliberate clockwise sequence rather than all at
 * once.
 */
export const pillarContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.45 },
  },
};

export const pillarNodeVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const hubVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Staggered stroke-draw for each hub-to-pillar connector line. */
export const connectorLineTransition = (index: number): Transition => ({
  duration: 0.8,
  delay: 0.3 + index * 0.1,
  ease: [0.16, 1, 0.3, 1],
});

export const hubPulseAnimation = {
  scale: [1, 1.04, 1],
};

export const hubPulseTransition: Transition = {
  duration: 4,
  repeat: Infinity,
  ease: "easeInOut",
};
