"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DashboardMockup } from "./DashboardMockup";
import { MetricWidget } from "./MetricWidget";
import { METRICS } from "./metricsData";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ambientGlowBackground } from "@/styles/glassEffects";
import { showcaseVariants, metricStackVariants } from "@/animations/processAnimations";

/**
 * Zingy — the exact mascot asset, un-restyled — presenting the
 * dashboard, with proof-metric cards floating around it. Mirrors the
 * composition language of the Hero and Solution showcases (ambient
 * glow, idle bob, staggered panel entrance) so this reads as the
 * same character in the same visual system, just interacting with a
 * different prop.
 */
export function ProcessShowcase() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={showcaseVariants}
      className="relative mx-auto flex w-full max-w-[540px] items-end justify-center"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: ambientGlowBackground(0.14) }}
        aria-hidden="true"
      />

      {/* Zingy, presenting the dashboard */}
      <motion.div
        className="relative z-10 aspect-[924/1316] w-[42%] shrink-0"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/assets/zingy/zingy-process.png"
          alt="Zingy, the LeadZing mascot, presenting a live analytics dashboard"
          fill
          sizes="(max-width: 768px) 45vw, 220px"
          className="object-contain object-bottom drop-shadow-[0_24px_48px_rgba(10,11,12,0.12)]"
        />
      </motion.div>

      {/* Dashboard + floating proof metrics, overlapping Zingy slightly for a staged, cohesive feel */}
      <div className="relative z-20 -ml-6 min-w-0 flex-1 sm:-ml-10">
        <DashboardMockup />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={metricStackVariants}
          className="contents"
        >
          {METRICS.map((metric) => (
            <MetricWidget key={metric.id} metric={metric} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
