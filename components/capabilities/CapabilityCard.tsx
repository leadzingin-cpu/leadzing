"use client";

import { motion } from "framer-motion";
import type { CapabilityData } from "./capabilitiesData";
import { capabilityCardVariants } from "@/animations/capabilitiesAnimations";

interface CapabilityCardProps {
  capability: CapabilityData;
}

/**
 * One service pillar in the Capabilities grid. Same glass-card
 * language as <PillarNode> (Solution) and the Hero's floating
 * panels — 16px radius, white/70 border, shadow-glass, backdrop
 * blur — so the section reads as a natural continuation of the page
 * rather than a new visual system.
 */
export function CapabilityCard({ capability }: CapabilityCardProps) {
  const Icon = capability.icon;

  return (
    <motion.div
      variants={capabilityCardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-full flex-col gap-3 rounded-base border border-white/70 bg-white/80 p-5 text-left shadow-glass backdrop-blur-glass transition-shadow duration-medium ease-out-premium hover:shadow-high sm:p-6"
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary-dark">
        <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-display text-base font-bold text-ink sm:text-lg">
          {capability.title}
        </h3>
        <p className="mt-1.5 font-body text-sm leading-relaxed text-ink-500">
          {capability.description}
        </p>
      </div>
    </motion.div>
  );
}
