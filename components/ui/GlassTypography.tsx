"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  glassTextBase,
  glassTextGlow,
  glassTextHighlight,
  glassReflectionMask,
} from "@/styles/glassEffects";

interface GlassTypographyProps {
  text: string;
  className?: string;
}

/**
 * The section centerpiece: a giant word rendered as real, accessible
 * text but styled to read as frosted glass — internal cyan glow, a
 * soft specular highlight layer, a thin dark stroke standing in for a
 * refracted edge, and a mirrored, fading floor reflection beneath it.
 *
 * Accessibility: the base layer (`<p>`) IS the real, visible, readable
 * text — everything stacked on top of it (glow pulse, highlight sheen,
 * floor reflection) is `aria-hidden` decoration, not a duplicate
 * screen-reader target. It's a `<p>`, not an `<h2>`/`<h3>`, because
 * it's a decorative centerpiece word, not the section's actual
 * heading — that role belongs to the headline above it.
 *
 * Motion: scales 95% -> 100% and its glow intensifies as it enters
 * the viewport; tilts a few degrees with the cursor for a "catching
 * the light" feel; both are skipped under reduced motion, leaving a
 * static (still fully styled) glass word.
 */
export function GlassTypography({ text, className }: GlassTypographyProps) {
  const reduceMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.35"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const tiltX = useSpring(rawTiltX, { stiffness: 50, damping: 20 });
  const tiltY = useSpring(rawTiltY, { stiffness: 50, damping: 20 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rawTiltY.set(px * 6);
    rawTiltX.set(py * -4);
  };

  const handlePointerLeave = () => {
    rawTiltX.set(0);
    rawTiltY.set(0);
  };

  const textClasses = cn(
    "block select-none text-center font-display font-black leading-[0.9] tracking-[-0.03em]",
    className
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ scale: reduceMotion ? 1 : scale, perspective: 1000 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full"
    >
      <motion.div
        style={{
          rotateX: reduceMotion ? 0 : tiltX,
          rotateY: reduceMotion ? 0 : tiltY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Real, visible, accessible text — the glass fill IS the readable copy */}
        <p style={glassTextBase} className={textClasses}>
          {text}
        </p>

        {/* Decorative: pulsing outer glow, intensifies on scroll-in */}
        <motion.span
          aria-hidden="true"
          style={{ ...glassTextGlow(1), opacity: reduceMotion ? 0.7 : glowOpacity }}
          className={cn("pointer-events-none absolute inset-0", textClasses, "text-white/0")}
        >
          {text}
        </motion.span>

        {/* Decorative: specular highlight sheen */}
        <span
          aria-hidden="true"
          style={glassTextHighlight}
          className={cn("pointer-events-none absolute inset-0", textClasses)}
        >
          {text}
        </span>
      </motion.div>

      {/* Decorative: mirrored floor reflection */}
      <div
        aria-hidden="true"
        style={glassReflectionMask}
        className="pointer-events-none relative -mt-4 scale-y-[-1] opacity-40"
      >
        <span style={glassTextBase} className={textClasses}>
          {text}
        </span>
      </div>
    </motion.div>
  );
}
