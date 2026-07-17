"use client";

import { motion } from "framer-motion";
import type { PillarData } from "./pillarsData";
import { pillarNodeVariants } from "@/animations/solutionAnimations";

interface PillarNodeProps {
  pillar: PillarData;
}

/**
 * A single glass "pillar" card in the Solution hub-spoke diagram.
 * Positioning (left/top + centering translate) lives on a plain,
 * non-motion wrapper so it never fights with Framer Motion's own
 * transform — which is reserved for the entrance animation and the
 * hover lift on the inner element.
 */
export function PillarNode({ pillar }: PillarNodeProps) {
  const Icon = pillar.icon;

  return (
    <li
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${pillar.x}%`, top: `${pillar.y}%` }}
    >
      <motion.div
        variants={pillarNodeVariants}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="flex w-[86px] flex-col items-center gap-2 rounded-base border border-white/70 bg-white/80 p-3 text-center shadow-glass backdrop-blur-glass transition-shadow duration-medium ease-out-premium hover:shadow-high sm:w-[104px] sm:gap-2.5 sm:p-3.5 lg:w-[124px] lg:p-4"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary-dark sm:size-9 lg:size-10">
          <Icon
            className="size-4 sm:size-[1.125rem] lg:size-5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
        <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-ink sm:text-xs lg:text-sm">
          {pillar.label}
        </span>
      </motion.div>
    </li>
  );
}
