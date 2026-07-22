"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { trustRowVariants } from "@/animations/ctaFooterAnimations";

/**
 * Initials-based avatar stack rather than stock client photography —
 * we don't have licensed photos of real clients to show here, and
 * this reads just as premium while staying honest about what it is.
 */
const AVATAR_INITIALS = ["A", "R", "S", "M"];

export function TrustRow() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={trustRowVariants}
      className="mt-8 flex items-center gap-4"
    >
      <div className="flex -space-x-3">
        {AVATAR_INITIALS.map((initial, i) => (
          <span
            key={initial}
            className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-primary/15 font-display text-xs font-bold text-primary-dark shadow-low"
            style={{ zIndex: AVATAR_INITIALS.length - i }}
          >
            {initial}
          </span>
        ))}
      </div>

      <div>
        <p className="font-body text-sm font-semibold text-ink">
          Trusted by 120+ businesses
        </p>
        <p className="mt-0.5 flex items-center gap-1 font-body text-sm text-ink-500">
          <span className="font-semibold text-ink">4.9</span>
          <Star className="size-3.5 fill-primary text-primary" strokeWidth={0} aria-hidden="true" />
          average client rating
        </p>
      </div>
    </motion.div>
  );
}
