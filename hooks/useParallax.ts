"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

interface ParallaxValues {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Maps pointer position within a container to a springy [-1, 1] range,
 * for subtle parallax on the hologram panels and Zingy himself.
 * Disabled entirely when reduced motion is preferred (caller decides
 * whether to attach the resulting values to a transform).
 */
export function useParallax(strength = 1): ParallaxValues {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const normalizedX = (event.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (event.clientY / window.innerHeight - 0.5) * 2;
      rawX.set(normalizedX * strength);
      rawY.set(normalizedY * strength);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [rawX, rawY, strength]);

  return { x, y };
}
