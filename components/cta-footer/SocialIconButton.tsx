"use client";

import { motion } from "framer-motion";
import type { SocialLink } from "./footerData";

interface SocialIconButtonProps {
  social: SocialLink;
}

/**
 * A circular outlined icon button — border brightens to the primary
 * color and lifts slightly on hover/focus, with a soft cyan glow.
 * Focus ring is never suppressed (design system requirement).
 */
export function SocialIconButton({ social }: SocialIconButtonProps) {
  const Icon = social.icon;

  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex size-11 items-center justify-center rounded-full border border-ink/10 text-ink-500 transition-all duration-fast ease-out-premium hover:border-primary hover:text-primary-dark hover:shadow-[0_0_16px_rgba(18,225,242,0.35)] sm:size-10"
    >
      <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
    </motion.a>
  );
}
