"use client";

import { motion } from "framer-motion";
import { HeroContent } from "./HeroContent";
import { ZingyShowcase } from "./ZingyShowcase";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Hero() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-white pt-32 sm:pt-36 lg:min-h-[120vh]"
      aria-label="Introduction"
    >
      {/* Barely-there ambient light, no gradients or blobs per brand direction */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/3 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(18,225,242,0.06), rgba(255,255,255,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-container grid-cols-1 items-center gap-16 px-6 sm:px-8 lg:grid-cols-[55%_45%] lg:gap-8 lg:px-12">
        <HeroContent />
        <ZingyShowcase />
      </div>

      {/* Cinematic dissolve into the next section — no hard cut */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-white/0 to-white"
        aria-hidden="true"
      />

      <motion.a
        href="#capabilities"
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="Scroll to next section"
      >
        <span className="font-body text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-ink-500">
          Scroll
        </span>
        <motion.span
          className="h-9 w-px bg-ink/20"
          animate={reduceMotion ? undefined : { scaleY: [1, 0.4, 1] }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.a>
    </section>
  );
}
