"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ambientGlowBackground } from "@/styles/glassEffects";
import { hubVariants, hubPulseAnimation, hubPulseTransition } from "@/animations/capabilitiesAnimations";

/**
 * The centerpiece of the Capabilities ecosystem diagram: the
 * LeadZing mark in a pulsing glass badge, with Zingy — the exact
 * asset used in the Hero, never restyled — staged behind/below it as
 * the one presenting the system. Every capability card's connector
 * line (drawn by the parent <EcosystemDiagram>) points at this badge.
 */
export function EcosystemHub() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={hubVariants}
      className="relative mx-auto flex h-[320px] w-full max-w-[280px] items-center justify-center sm:h-[400px] sm:max-w-[320px] lg:h-[460px]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: ambientGlowBackground(0.16) }}
        aria-hidden="true"
      />

      {/* Zingy, presenting the system */}
      <motion.div
        className="relative z-10 h-full w-full"
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/assets/zingy/zingy-capabilities.PNG"
          alt="Zingy, the LeadZing mascot, presenting LeadZing's connected system of capabilities"
          fill
          sizes="(max-width: 768px) 70vw, 320px"
          className="object-contain object-bottom drop-shadow-[0_24px_48px_rgba(10,11,12,0.10)]"
          priority={false}
        />
      </motion.div>

      {/* LeadZing mark — the literal hub every connector line routes into */}
      <motion.div
        className="absolute left-1/2 top-[6%] z-20 -translate-x-1/2"
        animate={reduceMotion ? undefined : hubPulseAnimation}
        transition={hubPulseTransition}
      >
        <div className="flex size-16 items-center justify-center rounded-full border border-white/70 bg-white/90 shadow-high backdrop-blur-glass sm:size-20">
          <Image
            src="/assets/logo/logo-icon.png"
            alt="LeadZing"
            width={48}
            height={48}
            className="h-9 w-9 sm:h-11 sm:w-11"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
