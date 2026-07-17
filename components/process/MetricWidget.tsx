"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MetricData } from "./metricsData";
import { metricVariants } from "@/animations/processAnimations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MetricWidgetProps {
  metric: MetricData;
}

/**
 * A small "proof point" glass card floating around the dashboard —
 * same holographic-panel language as the Hero and Capabilities
 * widgets, positioned absolutely relative to the showcase stage.
 */
export function MetricWidget({ metric }: MetricWidgetProps) {
  const reduceMotion = usePrefersReducedMotion();
  const Icon = metric.icon;

  return (
    <motion.div
      variants={metricVariants}
      className={cn(
        "absolute hidden w-[168px] rounded-base border border-white/70 bg-white/85 p-3.5 shadow-glass backdrop-blur-glass sm:block",
        metric.position
      )}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: metric.delay }}
      >
        <div className="mb-1.5 flex items-center gap-1.5">
          <Icon className="size-3.5 text-primary-dark" strokeWidth={2} aria-hidden="true" />
          <span className="font-body text-[0.6875rem] font-medium text-ink-500">
            {metric.label}
          </span>
        </div>
        <div className="font-display text-lg font-bold text-ink">{metric.value}</div>
        {metric.sublabel && (
          <div className="font-body text-[0.6875rem] text-ink-500">{metric.sublabel}</div>
        )}
      </motion.div>
    </motion.div>
  );
}
