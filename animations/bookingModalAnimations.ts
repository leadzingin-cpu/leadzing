import type { Variants, Transition } from "framer-motion";

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 10,
    filter: "blur(2px)",
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
};

export const stepVariants: Variants = {
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction * 16,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction * -16,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export const successIconTransition: Transition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
};

export const dropdownPanelVariants: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15 } },
};
