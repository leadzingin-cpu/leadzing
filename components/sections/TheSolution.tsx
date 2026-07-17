"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HubSpokeDiagram } from "@/components/solution/HubSpokeDiagram";
import { SolutionShowcase } from "@/components/solution/SolutionShowcase";
import {
  solutionHeadlineLineVariants,
  solutionCopyVariants,
} from "@/animations/solutionAnimations";

const HEADLINE_LINES = [
  "We engineer",
  "brands that can't",
  "be ignored.",
];

/**
 * Section 3 — "The Solution". The emotional release right after
 * "The Invisible Problem": having just named the real gap
 * (visibility, not quality), this section answers it — one connected
 * system spanning strategy, content, websites, branding and growth,
 * routed through a single hub instead of five disconnected vendors.
 *
 * Composition: a centered headline + supporting copy (matching
 * Phase 2's rhythm), then a two-column stage below it — the
 * hub-spoke diagram on one side, Zingy presenting it on the other.
 * No hard divider from Phase 2: same white background, same ambient
 * glow language, so the scroll feels continuous rather than a new
 * "page".
 */
export function TheSolution() {
  return (
    <section
      id="solution"
      aria-label="The solution"
      className="relative overflow-hidden bg-white py-28 lg:py-36"
    >
      <Container className="relative max-w-container-wide">
        <div className="mx-auto flex max-w-[60ch] flex-col items-center text-center">
          <SectionLabel className="mb-8">The Solution</SectionLabel>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            transition={{ staggerChildren: 0.12 }}
            className="font-display text-[2.75rem] font-black leading-[1.05] tracking-[-0.02em] text-ink sm:text-[6rem] lg:text-[5.5rem]"
          >
            {HEADLINE_LINES.map((line) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span variants={solutionHeadlineLineVariants} className="block">
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
            className="mt-8 font-body text-lg leading-relaxed text-ink-500 sm:text-xl"
          >
            <motion.span variants={solutionCopyVariants} className="block">
              Random content and temporary trends don&rsquo;t build brands.
            </motion.span>
            <motion.span variants={solutionCopyVariants} className="mt-2 block">
              We connect{" "}
              <span className="font-semibold text-primary-dark">
                strategy, content, websites, branding and growth
              </span>{" "}
              into one system &mdash; so every piece works together.
            </motion.span>
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 items-center gap-16 lg:mt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <HubSpokeDiagram />
          <SolutionShowcase />
        </div>
      </Container>
    </section>
  );
}
