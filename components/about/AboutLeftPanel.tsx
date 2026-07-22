"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AboutInfoCard } from "./AboutInfoCard";
import { LEFT_INFO_CARDS } from "./aboutData";
import { aboutStaggerContainer, aboutStaggerItem } from "@/animations/aboutModalAnimations";

/**
 * No founder portrait, per the brief — just the mark, the name, a
 * tagline pill, and three stat cards. Scrolls on its own only if it
 * genuinely needs to (short/tall viewports); on desktop it stays put
 * while the right panel scrolls independently.
 */
export function AboutLeftPanel() {
  return (
    <div className="flex w-full shrink-0 flex-col items-center overflow-visible border-b border-ink/10 bg-white px-8 py-10 text-center md:w-[38%] md:overflow-y-auto md:border-b-0 md:border-r md:px-8 md:py-12">
      <Image
        src="/assets/logo/logo-icon.png"
        alt="LeadZing"
        width={160}
        height={160}
        className="h-28 w-28 sm:h-32 sm:w-32"
        priority
      />

      <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">LeadZing</h2>
      <p className="mt-1 font-body text-sm text-ink-500">Creative Marketing Agency</p>

      <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-dark px-4 py-2 text-white shadow-low">
        <span className="size-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />
        <span className="font-body text-xs font-semibold">Building brands people remember.</span>
      </span>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={aboutStaggerContainer}
        transition={{ delayChildren: 0.15 }}
        className="mt-8 flex w-full flex-col gap-3"
      >
        {LEFT_INFO_CARDS.map((card) => (
          <motion.div key={card.id} variants={aboutStaggerItem}>
            <AboutInfoCard card={card} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
