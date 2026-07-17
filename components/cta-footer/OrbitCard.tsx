"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { OrbitCardData } from "./orbitServicesData";
import { orbitCardVariants } from "@/animations/ctaFooterAnimations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface OrbitCardProps {
  card: OrbitCardData;
}

/**
 * One service card in the orbit around Zingy — same glass-card
 * language used throughout the site, positioned absolutely within
 * the mascot stage and given a slow independent idle drift so the
 * ring of cards feels alive without competing with the hologram.
 */
export function OrbitCard({ card }: OrbitCardProps) {
  const reduceMotion = usePrefersReducedMotion();
  const Icon = card.icon;

  return (
    <motion.div
      variants={orbitCardVariants}
      whileHover={{ scale: 1.06, y: -2 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "absolute z-10 hidden w-[104px] flex-col items-center gap-1.5 rounded-base border border-white/70 bg-white/80 px-2.5 py-3 text-center shadow-glass backdrop-blur-glass sm:flex sm:w-[118px] sm:gap-2 sm:px-3 sm:py-3.5",
        card.side === "left" ? "left-0 -translate-x-1/4" : "right-0 translate-x-1/4"
      )}
      style={{ top: `${card.y}%` }}
    >
      <motion.div
        className="flex flex-col items-center gap-1.5 sm:gap-2"
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 5 + card.delay * 4, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary-dark sm:size-9">
          <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
        </span>
        <span className="font-display text-[0.6875rem] font-bold uppercase leading-tight tracking-[0.03em] text-ink">
          {card.title}
        </span>
      </motion.div>
    </motion.div>
  );
}
