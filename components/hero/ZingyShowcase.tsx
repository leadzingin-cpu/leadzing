"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useParallax";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { FloatingPanel } from "./FloatingPanel";
import { FLOATING_PANELS } from "./panelsData";

/**
 * Zingy is used exactly as delivered in the reference art — face,
 * feather color, hoodie, and proportions are untouched. This
 * component only stages him: ambient light, orbiting UI panels, and
 * a slow idle drift. Nothing here restyles the character itself.
 */
export function ZingyShowcase() {
  const reduceMotion = usePrefersReducedMotion();
  const { x, y } = useParallax(1);

  return (
    <div
      className="relative mx-auto flex h-[420px] w-full max-w-[440px] items-center justify-center sm:h-[520px] lg:h-[640px]"
    >
      {/* Ambient radial light — barely visible, luxury minimalism */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(closest-side, rgba(18,225,242,0.10), rgba(18,225,242,0) 70%)",
        }}
      />

      {FLOATING_PANELS.map((panel) => (
        <FloatingPanel
          key={panel.id}
          panel={panel}
          parallaxX={x}
          parallaxY={y}
          reduceMotion={reduceMotion}
        />
      ))}

      <motion.div
        className="relative z-10 h-full w-full"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/assets/zingy/zingy-hero.png"
            alt="Zingy, the LeadZing mascot, standing confidently in a LeadZing hoodie with one hand raised in greeting"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 440px"
            className="object-contain object-bottom drop-shadow-[0_24px_48px_rgba(10,11,12,0.10)]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
