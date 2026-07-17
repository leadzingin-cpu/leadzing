"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { PROCESS_STEPS } from "./processData";
import { processStripVariants, processStepVariants } from "@/animations/capabilitiesAnimations";

/**
 * The Discover -> Scale process strip: six steps in a single glass
 * container. Wraps to two rows on tablet, scrolls horizontally on
 * mobile (matching how the rest of the site favors real, scrollable
 * content over a squashed grid at small sizes).
 */
export function ProcessStrip() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={processStripVariants}
      className="mt-16 rounded-base border border-white/70 bg-white/80 p-5 shadow-glass backdrop-blur-glass sm:p-6 lg:mt-24 lg:p-8"
    >
      <ol className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-1 lg:snap-none lg:justify-between lg:gap-2 lg:overflow-visible lg:pb-0">
        {PROCESS_STEPS.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === PROCESS_STEPS.length - 1;

          return (
            <motion.li
              key={step.id}
              variants={processStepVariants}
              className="flex shrink-0 snap-start items-start gap-3 lg:shrink lg:basis-0 lg:grow"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-dark">
                <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
              </span>
              <div className="max-w-[168px]">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.04em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-1 font-body text-[0.8125rem] leading-relaxed text-ink-500">
                  {step.description}
                </p>
              </div>

              {!isLast && (
                <ChevronRight
                  className="mt-1.5 hidden size-4 shrink-0 text-ink-300 lg:block"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </motion.li>
          );
        })}
      </ol>
    </motion.div>
  );
}
