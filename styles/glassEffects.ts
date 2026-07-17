import type { CSSProperties } from "react";

/**
 * Style constants for the CSS-only "frosted glass" text effect used by
 * <GlassTypography>. Kept out of the component so the recipe — glow
 * radius, stroke color, reflection falloff — can be tuned in one place
 * without touching layout/animation logic.
 *
 * Approach: real text (accessible, SEO-visible, crisp at any size) is
 * layered with a soft cyan glow, a thin dark edge stroke to read as a
 * glass boundary, and a mirrored, gradient-masked duplicate beneath it
 * to fake a floor reflection. No images, no WebGL — GPU-cheap
 * transform/opacity/filter only, per the design system's performance
 * guidance against heavy scroll-driven JS.
 */

export const glassTextBase: CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, #ffffff 0%, #eafcff 42%, #bdf3fb 78%, #8fe9f5 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextStroke: "1px rgba(10, 11, 12, 0.06)",
};

export const glassTextGlow = (intensity: number): CSSProperties => ({
  filter: `drop-shadow(0 0 ${18 * intensity}px rgba(18, 225, 242, ${0.35 * intensity})) drop-shadow(0 0 ${48 * intensity}px rgba(18, 225, 242, ${0.22 * intensity}))`,
});

export const glassTextHighlight: CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.15) 35%, rgba(255,255,255,0) 60%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  mixBlendMode: "overlay",
};

export const glassReflectionMask: CSSProperties = {
  maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.22), transparent 85%)",
  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.22), transparent 85%)",
};

export const ambientGlowBackground = (opacity: number) =>
  `radial-gradient(closest-side, rgba(18,225,242,${opacity}), rgba(18,225,242,0) 70%)`;
