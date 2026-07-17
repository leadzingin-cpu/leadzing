"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Wraps the app in Lenis smooth scrolling — but only on desktop-sized
 * viewports (matching the site's own `lg` breakpoint, 1024px, used
 * everywhere else for the desktop/mobile split). Renders nothing
 * itself — Lenis operates on the native scroll container.
 *
 * Mobile/tablet intentionally get plain native scrolling instead of
 * Lenis, for two concrete reasons:
 *
 * 1. Lenis caches the document's scrollable height at init and on
 *    resize. On mobile, that height can go stale — late-loading
 *    images/fonts, the browser's dynamic URL-bar show/hide changing
 *    viewport height, or content reflowing as scroll-triggered
 *    animations mount — which caps how far Lenis will let the page
 *    scroll short of the real document height. Sections positioned
 *    deep in the page (like Process) can become unreachable, which
 *    reads exactly like "the section is blank/missing" even though
 *    the DOM is completely intact. Native scroll has no such cache
 *    and always tracks the real content height.
 * 2. Lenis intercepts touch input to drive its own scroll animation,
 *    which can fight the booking modal's own scroll lock and its
 *    internal `overflow-y-auto` step content on touch devices.
 *
 * Desktop keeps the original Lenis feel, completely unchanged. If the
 * viewport crosses the 1024px line at runtime (resizing a desktop
 * browser window, or rotating a tablet), Lenis is started or stopped
 * to match — this only matters above `lg`, so it never affects phones.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typeof window === "undefined") return;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    let lenis: Lenis | null = null;
    let frameId: number;

    function raf(time: number) {
      lenis?.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    function start() {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });
      frameId = requestAnimationFrame(raf);
    }

    function stop() {
      if (!lenis) return;
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenis = null;
    }

    function handleChange(e: MediaQueryListEvent | MediaQueryList) {
      if (e.matches) start();
      else stop();
    }

    handleChange(desktopQuery);
    desktopQuery.addEventListener("change", handleChange);

    return () => {
      desktopQuery.removeEventListener("change", handleChange);
      stop();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
