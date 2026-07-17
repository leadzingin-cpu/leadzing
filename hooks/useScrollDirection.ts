"use client";

import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down";

interface ScrollState {
  direction: ScrollDirection;
  isAtTop: boolean;
}

/**
 * Reports scroll direction and top-of-page state so the navbar can
 * hide on scroll-down, reveal on scroll-up, and shed its shadow when
 * back at the very top. Threshold avoids jitter from sub-pixel scroll
 * events (common with trackpads and Lenis's inertia).
 */
export function useScrollDirection(threshold = 8): ScrollState {
  const [state, setState] = useState<ScrollState>({
    direction: "up",
    isAtTop: true,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateDirection = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (Math.abs(delta) >= threshold) {
        setState({
          direction: delta > 0 ? "down" : "up",
          isAtTop: currentScrollY < 16,
        });
        lastScrollY = currentScrollY;
      } else if (currentScrollY < 16) {
        setState((prev) => ({ ...prev, isAtTop: true }));
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}
