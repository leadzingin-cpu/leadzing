import type { Variants } from "framer-motion";

/** Same backdrop treatment as the booking modal, so the two feel identical. */
export const aboutBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
};

/** Fade + scale, ~250ms per the brief — a touch quicker than the booking modal's since this one has no step transitions to choreograph around. */
export const aboutModalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export const aboutStaggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export const aboutStaggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};
