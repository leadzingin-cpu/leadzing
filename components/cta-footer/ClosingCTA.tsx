"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useBookingModal } from "@/components/booking/BookingModalContext";
import { MascotShowcase } from "./MascotShowcase";
import {
  ctaHeadlineLineVariants,
  ctaCopyVariants,
  ctaButtonRowVariants,
  ctaButtonVariants,
} from "@/animations/ctaFooterAnimations";

const HEADLINE_LINES = ["Let's Build Something", "People Remember."];

/**
 * Part 1 of Phase 6 — the site's final, hero-scale call to action.
 * Left: eyebrow, headline, copy, primary/secondary CTAs.
 * Right: the mascot showcase. Same left-aligned-header-beside-visual
 * composition as Phase 5, closing the loop on the page's rhythm
 * rather than introducing a new one.
 */
export function ClosingCTA() {
  const { openModal } = useBookingModal();

  return (
    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
      <div className="flex flex-col items-start text-left">
        <SectionLabel className="mb-8 justify-start">Ready to grow?</SectionLabel>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          transition={{ staggerChildren: 0.12 }}
          className="font-display text-[2.75rem] font-black leading-[1.05] tracking-[-0.02em] text-ink sm:text-[4rem] lg:text-[4.5rem]"
        >
          {HEADLINE_LINES.map((line) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span variants={ctaHeadlineLineVariants} className="block">
                {line}
                {line === HEADLINE_LINES[HEADLINE_LINES.length - 1] && (
                  <span className="text-primary-dark">.</span>
                )}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={ctaCopyVariants}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-[42ch] font-body text-lg leading-relaxed text-ink-500 sm:text-xl"
        >
          Strategy. Creativity. Technology.
          <br />
          One partner for long-term growth.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={ctaButtonRowVariants}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <motion.div variants={ctaButtonVariants}>
            <Button
              size="lg"
              onClick={openModal}
              className="w-full shadow-[0_10px_36px_rgba(18,225,242,0.38)] sm:w-auto"
            >
              Book Your Discovery Call
            </Button>
          </motion.div>
          <motion.div variants={ctaButtonVariants}>
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() =>
                document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See Our Process
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <MascotShowcase />
    </div>
  );
}
