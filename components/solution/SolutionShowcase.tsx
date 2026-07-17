"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LineChart } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ambientGlowBackground } from "@/styles/glassEffects";

const CAPTION_LINES = ["Strategy driven.", "Creative led.", "Results focused."];

/**
 * Zingy, staged for the Solution section — the exact same asset and
 * pose used in the Hero (never restyled), paired with a single glass
 * "proof" panel and a short caption instead of the Hero's five
 * orbiting panels. Keeping this lighter than the Hero's showcase
 * lets the section read as a quieter, more confident beat rather
 * than a repeat of the opening moment.
 */
export function SolutionShowcase() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto flex h-[360px] w-full max-w-[380px] items-center justify-center sm:h-[440px] lg:h-[520px]">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: ambientGlowBackground(0.09) }}
        aria-hidden="true"
      />

      {/* Proof panel — same glass-card language as the Hero's holographic panels, without duplicating them */}
      <motion.div
        className="absolute right-[-4%] top-[6%] hidden w-[152px] rounded-base border border-white/70 bg-white/80 p-3.5 shadow-glass backdrop-blur-glass md:block"
        initial={{ opacity: 0, y: 16, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="mb-2 flex items-center gap-1.5">
            <LineChart
              className="size-3.5 text-primary-dark"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="font-body text-[0.6875rem] font-medium text-ink-500">
              Client Growth
            </span>
          </div>
          <div className="flex items-end justify-between">
            <svg width="60" height="26" viewBox="0 0 60 26" fill="none" aria-hidden="true">
              <path
                d="M2 20 L14 15 L26 18 L38 7 L58 2"
                stroke="var(--color-primary-dark)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-display text-sm font-bold text-ink">+128%</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10 h-full w-full"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/assets/zingy/zingy-solution.PNG"
            alt="Zingy, the LeadZing mascot, presenting LeadZing's connected approach to brand growth"
            fill
            sizes="(max-width: 768px) 80vw, 380px"
            className="object-contain object-bottom drop-shadow-[0_24px_48px_rgba(10,11,12,0.10)]"
          />
        </motion.div>
      </motion.div>

      <motion.ul
        className="absolute bottom-2 left-[-2%] hidden flex-col gap-1.5 sm:flex"
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {CAPTION_LINES.map((line) => (
          <li
            key={line}
            className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-ink-500"
          >
            {line}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
