import type { Variants, Transition } from "framer-motion";

/** Headline lines — same rise + blur-to-sharp treatment used by every prior section. */
export const processHeadlineLineVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const processCopyVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Parent for the five step cards — staggers them left to right along the journey. */
export const timelineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

export const timelineCardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Staggered stroke-draw for the connecting path beneath the timeline. */
export const connectorPathTransition: Transition = {
  duration: 1.6,
  delay: 0.3,
  ease: [0.16, 1, 0.3, 1],
};

/** Continuous "flowing energy" dash animation layered over the static connector line. */
export const flowingDashAnimation = {
  strokeDashoffset: [0, -32],
};

export const flowingDashTransition: Transition = {
  duration: 2.2,
  repeat: Infinity,
  ease: "linear",
};

/** Pulse applied to the small glow dot at each card's connection point. */
export const nodePulseAnimation = {
  scale: [1, 1.35, 1],
  opacity: [0.6, 1, 0.6],
};

export const nodePulseTransition = (delay = 0): Transition => ({
  duration: 2.4,
  repeat: Infinity,
  ease: "easeInOut",
  delay,
});

export const showcaseVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Parent for the floating metric widgets around the dashboard. */
export const metricStackVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
  },
};

export const metricVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const closingHeadlineVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scrollIndicatorAnimation = {
  y: [0, 8, 0],
};

export const scrollIndicatorTransition: Transition = {
  duration: 2,
  repeat: Infinity,
  ease: "easeInOut",
};
