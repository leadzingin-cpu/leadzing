import type { Variants } from "framer-motion";

/**
 * Headline lines rise gently with a blur-to-sharp transition — no
 * bounce, no overshoot. `filter` animates alongside `transform` so
 * both stay on the compositor; kept subtle (6px max blur) to avoid
 * the "gimmicky" look the brief explicitly warns against.
 */
export const headlineLineVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const supportingCopyVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * The CONSISTENCY / TRUST / STRATEGY chain — each word must appear
 * strictly after the one above it (per brief: "one after another"),
 * so this is consumed with a shared parent `staggerChildren` rather
 * than independent per-word delays.
 */
export const hierarchyContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.3 },
  },
};

export const hierarchyWordVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const dustParticleTransition = (index: number) => ({
  duration: 8 + (index % 4) * 2,
  repeat: Infinity,
  ease: "easeInOut" as const,
  delay: index * 0.6,
});
