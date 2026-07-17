"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useBookingModal } from "@/components/booking/BookingModalContext";
import { heroContainerVariants, heroItemVariants, heroLineVariants } from "./variants";

const HEADLINE_LINES = ["Building", "Brands", "People", "Remember."];

const TRUST_INDICATORS = [
  { icon: Target, label: "Strategy" },
  { icon: Lightbulb, label: "Creativity" },
  { icon: TrendingUp, label: "Growth" },
];

export function HeroContent() {
  const { openModal } = useBookingModal();

  return (
    <motion.div
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-start"
    >
      <motion.div
        variants={heroItemVariants}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 shadow-low"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-dark" />
        </span>
        <span className="font-body text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-700">
          Creative Marketing Agency
        </span>
      </motion.div>

      <h1 className="mb-8 font-display text-[clamp(2.5rem,10vw,3.25rem)] font-black leading-[0.98] tracking-[-0.02em] text-ink sm:text-[4.25rem] lg:text-h1-lg">
        {HEADLINE_LINES.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              variants={heroLineVariants}
              className="block"
              transition={{
                duration: 0.8,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        variants={heroItemVariants}
        className="mb-10 max-w-[34ch] font-body text-lg leading-relaxed text-ink-500"
      >
        We transform ambitious businesses into unforgettable brands through
        strategy, content, websites and creative storytelling.
      </motion.p>

      <motion.div variants={heroItemVariants} className="mb-14 flex flex-wrap gap-4">
        <Button variant="primary" size="lg" onClick={openModal}>
          Book Discovery Call
        </Button>
        <Button variant="secondary" size="lg">
          View Services
        </Button>
      </motion.div>

      <motion.ul
        variants={heroItemVariants}
        className="flex flex-wrap items-center gap-x-8 gap-y-3"
      >
        {TRUST_INDICATORS.map(({ icon: Icon, label }, i) => (
          <li key={label} className="flex items-center gap-2">
            <Icon className="size-4 text-ink-500" strokeWidth={1.75} aria-hidden="true" />
            <span className="font-body text-sm font-medium text-ink-500">{label}</span>
            {i < TRUST_INDICATORS.length - 1 && (
              <span className="ml-6 hidden h-4 w-px bg-ink/10 sm:block" aria-hidden="true" />
            )}
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
