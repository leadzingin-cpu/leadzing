"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A quieter, more premium eyebrow than <SectionHeading>'s pill badge —
 * monospaced, wide letter-spacing, no border or background. Reserved
 * for moments that want restraint over the badge treatment used
 * elsewhere on the page.
 */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex items-center justify-center gap-2.5 font-mono text-[0.6875rem] font-medium uppercase text-ink-500",
        className
      )}
      style={{ letterSpacing: "0.4em" }}
    >
      <span className="h-1 w-1 shrink-0 rounded-full bg-primary-dark" aria-hidden="true" />
      {children}
    </motion.div>
  );
}
