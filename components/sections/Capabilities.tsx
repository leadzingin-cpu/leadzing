"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EcosystemDiagram } from "@/components/capabilities/EcosystemDiagram";
import { ProcessStrip } from "@/components/capabilities/ProcessStrip";
import {
  capabilitiesHeadlineLineVariants,
  capabilitiesCopyVariants,
} from "@/animations/capabilitiesAnimations";

const HEADLINE_LINES = ["Everything your brand needs.", "One connected system."];

/**
 * Section 4 — "Capabilities". Follows the same rhythm as Phase 2 and
 * Phase 3: centered eyebrow + headline + supporting copy, then a
 * two-part stage below it. No hard divider from "The Solution" —
 * same white background and ambient-glow language — so the scroll
 * stays continuous rather than starting a new "page".
 *
 * Composition: capability cards + connected hub + proof widgets
 * (<EcosystemDiagram>), then the Discover -> Scale process
 * (<ProcessStrip>) as the section's closing beat.
 */
export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-label="Capabilities"
      className="relative overflow-hidden bg-white py-28 lg:py-36"
    >
      <Container className="relative max-w-container-wide">
        <div className="mx-auto flex max-w-[62ch] flex-col items-center text-center">
          <SectionLabel className="mb-8">Capabilities</SectionLabel>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            transition={{ staggerChildren: 0.12 }}
            className="font-display text-[2.5rem] font-black leading-[1.08] tracking-[-0.02em] text-ink sm:text-[3.5rem] lg:text-[4rem]"
          >
            {HEADLINE_LINES.map((line) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span variants={capabilitiesHeadlineLineVariants} className="block">
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
            <motion.span variants={capabilitiesCopyVariants} className="block">
              We combine{" "}
              <span className="font-semibold text-primary-dark">
                strategy, branding, content production, websites, automation and marketing
              </span>{" "}
              into one seamless ecosystem that grows your business.
            </motion.span>
          </motion.p>
        </div>

        <EcosystemDiagram />
        <ProcessStrip />
      </Container>
    </section>
  );
}
