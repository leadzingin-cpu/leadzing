"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "./processStepsData";
import { ProcessStepCard } from "./ProcessStepCard";
import { ProcessAccordion } from "./ProcessAccordion";
import {
  timelineContainerVariants,
  connectorPathTransition,
  flowingDashAnimation,
  flowingDashTransition,
  nodePulseAnimation,
  nodePulseTransition,
} from "@/animations/processAnimations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const MAX_OFFSET = Math.max(...PROCESS_STEPS.map((s) => s.offsetY));

/** Schematic anchor points for the connector path — approximate, not pixel-matched to the DOM (same approach as `EcosystemDiagram`). */
const ANCHORS = PROCESS_STEPS.map((step, i) => ({
  x: 8 + i * 21,
  y: 18 + (step.offsetY / (MAX_OFFSET || 1)) * 42,
}));

function buildPath() {
  return ANCHORS.map((point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = ANCHORS[i - 1] ?? point;
    const midX = (prev.x + point.x) / 2;
    return `C ${midX} ${prev.y}, ${midX} ${point.y}, ${point.x} ${point.y}`;
  }).join(" ");
}

/**
 * The workflow journey. Below `md` (768px): a numbered accordion —
 * see <ProcessAccordion> — since five full cards' worth of copy has
 * no good horizontal layout at phone widths. From `md` up: the
 * original five-card zigzag row with its animated connector,
 * unchanged in every visual respect from `lg` (1024px) up — the only
 * thing that changed for true desktop is that this block now *also*
 * happens to be reachable a little earlier (768-1023px, tablet)
 * instead of only from 1024px, at a deliberately tightened width/gap
 * for just that in-between range so five cards actually fit there
 * without overflowing (see `ProcessStepCard`'s `md:` sizing).
 */
export function ProcessTimeline() {
  const reduceMotion = usePrefersReducedMotion();
  const pathD = buildPath();

  return (
    <div className="mt-16 lg:mt-24">
      {/* Mobile (<768px) — numbered accordion */}
      <div className="md:hidden">
        <ProcessAccordion />
      </div>

      {/* Tablet (768px) and up — the five-card zigzag row with animated connector */}
      <div className="relative hidden md:block">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d={pathD}
            fill="none"
            stroke="var(--color-primary)"
            strokeOpacity={0.28}
            strokeWidth={0.45}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={connectorPathTransition}
          />
          {!reduceMotion && (
            <motion.path
              d={pathD}
              fill="none"
              stroke="var(--color-primary-dark)"
              strokeOpacity={0.75}
              strokeWidth={0.55}
              strokeLinecap="round"
              strokeDasharray="3 5"
              vectorEffect="non-scaling-stroke"
              animate={flowingDashAnimation}
              transition={flowingDashTransition}
            />
          )}
          {ANCHORS.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={0.9}
              fill="var(--color-primary-dark)"
              animate={reduceMotion ? undefined : nodePulseAnimation}
              transition={nodePulseTransition(i * 0.2)}
            />
          ))}
        </svg>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={timelineContainerVariants}
          className="relative z-10 flex items-start justify-between gap-2 lg:gap-5 xl:gap-6"
        >
          {PROCESS_STEPS.map((step) => (
            <li key={step.id} style={{ transform: `translateY(${step.offsetY}px)` }}>
              <ProcessStepCard step={step} />
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
