"use client";

import { motion } from "framer-motion";
import type { ProcessStepData } from "./processStepsData";
import { timelineCardVariants } from "@/animations/processAnimations";

interface ProcessStepCardProps {
  step: ProcessStepData;
}

/**
 * One stage of the LeadZing workflow. Same glass-card language as
 * every other card on the page (16px radius, white/70 border,
 * shadow-glass, backdrop blur) with a large step number standing in
 * for the connector-line anchor point above it.
 */
export function ProcessStepCard({ step }: ProcessStepCardProps) {
  const Icon = step.icon;

  return (
    <motion.div
      variants={timelineCardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-full w-[128px] shrink-0 flex-col gap-3 rounded-base border border-white/70 bg-white/80 p-3 text-left shadow-glass backdrop-blur-glass transition-shadow duration-medium ease-out-premium hover:shadow-high lg:w-[240px] lg:gap-4 lg:p-5 xl:w-[260px] xl:p-6"
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-xl font-black text-primary-dark lg:text-2xl">
          {step.number}
        </span>
        <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary-dark lg:size-11">
          <Icon className="size-4 lg:size-5" strokeWidth={2} aria-hidden="true" />
        </span>
      </div>

      <h3 className="font-display text-base font-bold text-ink lg:text-lg">{step.title}</h3>

      <div className="flex flex-col gap-3">
        {step.paragraphs.map((paragraph, i) => (
          <p key={i} className="font-body text-sm leading-relaxed text-ink-500">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
