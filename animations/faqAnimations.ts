import type { Variants, Transition } from "framer-motion";

export const faqHeadlineLineVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const faqCopyVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const faqZingyCardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Parent for the six accordion cards — staggers them top to bottom. */
export const faqAccordionContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

export const faqCardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/** 400-500ms per the brief, mid-point of that range. */
export const FAQ_EXPAND_DURATION = 0.45;

export const faqAnswerTransition: Transition = {
  duration: FAQ_EXPAND_DURATION,
  ease: [0.16, 1, 0.3, 1],
};

export const faqToggleIconTransition: Transition = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1],
};

export const faqBottomCTAVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};
