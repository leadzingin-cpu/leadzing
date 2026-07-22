"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProcessShowcase } from "@/components/process/ProcessShowcase";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { ClosingStatement } from "@/components/process/ClosingStatement";
import {
  processHeadlineLineVariants,
  processCopyVariants,
} from "@/animations/processAnimations";

const HEADLINE_LINES = ["From idea", "to impact,", "step by step."];

/**
 * Section 5 — "The Process". Unlike Phases 2-4, the header pairs
 * with the showcase side by side instead of sitting fully centered
 * above it — the reference's asymmetric top layout — before the
 * five-stage timeline runs the full width beneath, and a short
 * closing statement (with a quiet downward cue) hands off to
 * whatever section follows. No hard divider from Capabilities: same
 * white background and ambient-glow language, so the scroll stays
 * continuous.
 */
export function TheProcess() {
  return (
    <section
      id="process"
      aria-label="The process"
      className="relative overflow-hidden bg-white pt-28 pb-8 lg:pb-12 lg:pt-36"
    >
      <Container className="relative max-w-container-wide">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="flex flex-col items-start text-left">
            <SectionLabel className="mb-8 justify-start">The Process</SectionLabel>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              transition={{ staggerChildren: 0.12 }}
              className="font-display text-[2.75rem] font-black leading-[1.05] tracking-[-0.02em] text-ink sm:text-[4rem] lg:text-[4.5rem]"
            >
              {HEADLINE_LINES.map((line) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span variants={processHeadlineLineVariants} className="block">
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={processCopyVariants}
              transition={{ delay: 0.3 }}
              className="mt-8 max-w-[46ch] font-body text-lg leading-relaxed text-ink-500 sm:text-xl"
            >
              Our process removes guesswork and replaces it with{" "}
              <span className="font-semibold text-primary-dark">
                clarity, strategy, and execution
              </span>
              .
            </motion.p>
          </div>

          <ProcessShowcase />
        </div>

        <ProcessTimeline />
        <ClosingStatement />
      </Container>
    </section>
  );
}
