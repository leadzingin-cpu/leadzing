import type { Variants, Transition } from "framer-motion";

/**
 * Headline lines — same rise + blur-to-sharp treatment used by
 * Phase 2 and Phase 3, kept as a section-local copy so Capabilities
 * can be tuned independently later without coupling to the other
 * sections' animation files.
 */
export const capabilitiesHeadlineLineVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const capabilitiesCopyVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Parent for the capability card grid — staggers the six cards in reading order. */
export const capabilityGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

export const capabilityCardVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Staggered stroke-draw for each connector line running into the hub. */
export const capabilityConnectorTransition = (index: number): Transition => ({
  duration: 0.9,
  delay: 0.25 + index * 0.12,
  ease: [0.16, 1, 0.3, 1],
});

export const hubVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export const hubPulseAnimation = {
  scale: [1, 1.05, 1],
};

export const hubPulseTransition: Transition = {
  duration: 4,
  repeat: Infinity,
  ease: "easeInOut",
};

/** Parent for the floating widget stack on the right. */
export const widgetStackVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

export const widgetVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Parent for the six-step process strip at the base of the section. */
export const processStripVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const processStepVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};
