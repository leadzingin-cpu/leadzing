"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ambientGlowBackground } from "@/styles/glassEffects";
import {
  faqHeadlineLineVariants,
  faqCopyVariants,
  faqZingyCardVariants,
} from "@/animations/faqAnimations";

const HEADLINE_LINES = ["Questions,", "answered."];
const COPY_LINES = [
  "No sales talk.",
  "No hidden surprises.",
  "Just clear answers before",
  "we build your brand.",
];

/**
 * Zingy is cropped to upper-body only via `object-top` inside a fixed-
 * aspect frame, reusing the existing `zingy-process.png` asset (hand
 * raised, holding and pointing at a device) rather than commissioning a
 * new pose — same official, unaltered mascot art used elsewhere on the
 * site, just framed differently for this card.
 */
export function FAQLeftPanel() {
  return (
    <div className="flex flex-col items-start text-left">
      <SectionLabel className="mb-8 justify-start">FAQ</SectionLabel>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.1 }}
        className="font-display text-[2.5rem] font-black leading-[1.08] tracking-[-0.02em] text-ink sm:text-[3.25rem] lg:text-[3.75rem]"
      >
        {HEADLINE_LINES.map((line) => (
          <span key={line} className="block overflow-hidden pb-1">
            <motion.span variants={faqHeadlineLineVariants} className="block">
              {line}
            </motion.span>
          </span>
        ))}
        <span className="block overflow-hidden pb-1">
          <motion.span variants={faqHeadlineLineVariants} className="block text-primary-dark">
            Honestly.
          </motion.span>
        </span>
      </motion.h2>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={faqCopyVariants}
        transition={{ delay: 0.25 }}
        className="mt-6 font-body text-base leading-relaxed text-ink-500 sm:text-lg"
      >
        {COPY_LINES.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={faqZingyCardVariants}
        className="relative mt-8 w-full max-w-[420px] overflow-hidden rounded-cta border border-white/70 bg-white/70 shadow-glass backdrop-blur-glass"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: ambientGlowBackground(0.12) }}
          aria-hidden="true"
        />
        <div className="relative aspect-[4/3] w-full">
          <Image
            src="/assets/zingy/zingy-faq.png"
            alt="Zingy, the LeadZing mascot, ready to answer your questions"
            fill
            sizes="(max-width: 768px) 90vw, 420px"
            className="object-cover object-top"
            style={{ objectPosition: "50% 8%" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
