import type { Variants, Transition } from "framer-motion";

export const ctaHeadlineLineVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const ctaCopyVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const ctaButtonRowVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.5 },
  },
};

export const ctaButtonVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const trustRowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const mascotStageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Very slow, opposite-direction rotation for the two concentric energy rings. */
export const ringRotateSlow = { rotate: 360 };
export const ringRotateSlowTransition: Transition = {
  duration: 90,
  repeat: Infinity,
  ease: "linear",
};

export const ringRotateReverse = { rotate: -360 };
export const ringRotateReverseTransition: Transition = {
  duration: 130,
  repeat: Infinity,
  ease: "linear",
};

export const hologramPulse = {
  scale: [1, 1.06, 1],
  opacity: [0.9, 1, 0.9],
};
export const hologramPulseTransition: Transition = {
  duration: 3.4,
  repeat: Infinity,
  ease: "easeInOut",
};

/** Parent for the eight orbit cards — staggers them in a natural sweep. */
export const orbitContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
};

export const orbitCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const orbitPathTransition: Transition = {
  duration: 1.8,
  delay: 0.3,
  ease: [0.16, 1, 0.3, 1],
};

export const orbitDashAnimation = { strokeDashoffset: [0, -40] };
export const orbitDashTransition: Transition = {
  duration: 3,
  repeat: Infinity,
  ease: "linear",
};

/** Parent for the footer's five columns. */
export const footerColumnsVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const footerColumnVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const globeRotateSlow = { rotate: 360 };
export const globeRotateTransition: Transition = {
  duration: 70,
  repeat: Infinity,
  ease: "linear",
};
