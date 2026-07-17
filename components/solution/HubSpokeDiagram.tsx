"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PILLARS } from "./pillarsData";
import { PillarNode } from "./PillarNode";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ambientGlowBackground } from "@/styles/glassEffects";
import {
  pillarContainerVariants,
  connectorLineTransition,
  hubVariants,
  hubPulseAnimation,
  hubPulseTransition,
} from "@/animations/solutionAnimations";

const HUB = { x: 50, y: 50 };

/**
 * The Solution's centerpiece: five service pillars radiating from a
 * central LeadZing hub, connected by animated lines — a literal
 * "everything routes through one system" diagram, built from the
 * same glass-card and SVG language as the rest of the site rather
 * than a static illustration. Fully percentage-based, so it scales
 * cleanly from mobile through wide desktop without separate layouts.
 */
export function HubSpokeDiagram() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={pillarContainerVariants}
      className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[540px]"
    >
      {/* Ambient glow behind the hub — echoes the Invisible Problem centerpiece */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: ambientGlowBackground(0.12) }}
        aria-hidden="true"
      />

      {/* Connector lines — one per pillar, stroke-drawn from hub to node */}
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {PILLARS.map((pillar, i) => (
          <motion.line
            key={pillar.id}
            x1={HUB.x}
            y1={HUB.y}
            x2={pillar.x}
            y2={pillar.y}
            stroke="var(--color-primary)"
            strokeOpacity={0.35}
            strokeWidth={0.6}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={connectorLineTransition(i)}
          />
        ))}
      </svg>

      {/* Pillar nodes — real list markup, so screen readers get the five service names in order */}
      <ul className="contents">
        {PILLARS.map((pillar) => (
          <PillarNode key={pillar.id} pillar={pillar} />
        ))}
      </ul>

      {/* Central hub — the LeadZing mark; everything on the page routes back through it */}
      <motion.div
        variants={hubVariants}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={reduceMotion ? undefined : hubPulseAnimation}
          transition={hubPulseTransition}
          className="flex size-16 items-center justify-center rounded-full border border-white/70 bg-white/90 shadow-high backdrop-blur-glass sm:size-20 lg:size-24"
        >
          <Image
            src="/assets/logo/logo-icon.png"
            alt=""
            width={48}
            height={48}
            className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
