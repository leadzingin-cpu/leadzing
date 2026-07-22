"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ORBIT_CARDS } from "./orbitServicesData";
import { OrbitCard } from "./OrbitCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ambientGlowBackground } from "@/styles/glassEffects";
import {
  mascotStageVariants,
  ringRotateSlow,
  ringRotateSlowTransition,
  ringRotateReverse,
  ringRotateReverseTransition,
  hologramPulse,
  hologramPulseTransition,
  orbitContainerVariants,
  orbitPathTransition,
  orbitDashAnimation,
  orbitDashTransition,
} from "@/animations/ctaFooterAnimations";

const HUB = { x: 50, y: 42 };

/** Schematic connector anchors — one per orbit card, same approximate approach as every other diagram on the site. */
const ANCHORS = ORBIT_CARDS.map((card) => ({
  x: card.side === "left" ? 6 : 94,
  y: card.y + 8,
}));

function buildSpoke(anchor: { x: number; y: number }) {
  const midX = (anchor.x + HUB.x) / 2;
  return `M ${anchor.x} ${anchor.y} Q ${midX} ${anchor.y}, ${HUB.x} ${HUB.y}`;
}

/**
 * The visual centerpiece of the closing CTA: Zingy — the exact Hero
 * asset, un-restyled — presenting a holographic LeadZing mark above
 * his raised hand, staged in front of slowly rotating energy rings
 * with eight service cards orbiting on thin animated spokes. Same
 * decorative, non-pixel-precise connector approach used by every
 * other diagram on the site (Solution's hub-spoke, Capabilities'
 * ecosystem diagram, Process's timeline).
 */
export function MascotShowcase() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={mascotStageVariants}
      className="relative mx-auto aspect-[1/1.05] w-full max-w-[420px] sm:max-w-[520px] lg:max-w-[600px]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: ambientGlowBackground(0.18) }}
        aria-hidden="true"
      />

      {/* Energy rings — slow, soft, opposite-direction rotation */}
      <motion.svg
        className="pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2"
        width="78%"
        viewBox="0 0 200 200"
        aria-hidden="true"
        animate={reduceMotion ? undefined : ringRotateSlow}
        transition={ringRotateSlowTransition}
      >
        <circle cx="100" cy="100" r="98" fill="none" stroke="var(--color-primary)" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="1 7" strokeLinecap="round" />
      </motion.svg>
      <motion.svg
        className="pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2"
        width="60%"
        viewBox="0 0 200 200"
        aria-hidden="true"
        animate={reduceMotion ? undefined : ringRotateReverse}
        transition={ringRotateReverseTransition}
      >
        <circle cx="100" cy="100" r="98" fill="none" stroke="var(--color-primary)" strokeOpacity="0.22" strokeWidth="1.25" strokeDasharray="1 5" strokeLinecap="round" />
      </motion.svg>
      <div
        className="pointer-events-none absolute left-1/2 top-[40%] size-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
        aria-hidden="true"
      />

      {/* Orbit spokes — one per card, converging behind Zingy */}
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {ANCHORS.map((anchor, i) => (
          <motion.path
            key={ORBIT_CARDS[i]?.id ?? i}
            d={buildSpoke(anchor)}
            fill="none"
            stroke="var(--color-primary)"
            strokeOpacity={0.3}
            strokeWidth={0.4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...orbitPathTransition, delay: 0.3 + i * 0.06 }}
          />
        ))}
        {!reduceMotion &&
          ANCHORS.map((anchor, i) => (
            <motion.path
              key={`dash-${ORBIT_CARDS[i]?.id ?? i}`}
              d={buildSpoke(anchor)}
              fill="none"
              stroke="var(--color-primary-dark)"
              strokeOpacity={0.5}
              strokeWidth={0.5}
              strokeLinecap="round"
              strokeDasharray="2 6"
              vectorEffect="non-scaling-stroke"
              animate={orbitDashAnimation}
              transition={orbitDashTransition}
            />
          ))}
      </svg>

      {/* Zingy, presenting the LeadZing mark */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 mx-auto aspect-[924/1316] w-[62%]"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/assets/zingy/zingy-hero.png"
          alt="Zingy, the LeadZing mascot, presenting the LeadZing ecosystem"
          fill
          sizes="(max-width: 768px) 60vw, 372px"
          className="object-contain object-bottom drop-shadow-[0_28px_54px_rgba(10,11,12,0.14)]"
        />
      </motion.div>

      {/* Holographic logo orb, floating above Zingy's raised hand */}
      <motion.div
        className="absolute left-[27%] top-[19%] z-20 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/70 shadow-high backdrop-blur-glass sm:size-20 lg:size-24"
        animate={reduceMotion ? undefined : hologramPulse}
        transition={hologramPulseTransition}
        style={{ boxShadow: "0 0 40px rgba(18,225,242,0.35), 0 0 0 1px rgba(255,255,255,0.4) inset" }}
      >
        <Image
          src="/assets/logo/logo-icon.png"
          alt="LeadZing"
          width={48}
          height={48}
          className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
        />
      </motion.div>

      {/* Orbiting service cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={orbitContainerVariants}
        className="contents"
      >
        {ORBIT_CARDS.map((card) => (
          <OrbitCard key={card.id} card={card} />
        ))}
      </motion.div>
    </motion.div>
  );
}
