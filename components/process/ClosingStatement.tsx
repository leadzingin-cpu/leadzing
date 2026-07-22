"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  closingHeadlineVariants,
  processCopyVariants,
  scrollIndicatorAnimation,
  scrollIndicatorTransition,
} from "@/animations/processAnimations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SCROLL_DURATION_MS = 800;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Smooth-scrolls to `#faq`, accounting for the floating sticky navbar
 * so the FAQ heading doesn't land underneath it. Native
 * `scrollIntoView({ behavior: "smooth" })` (used elsewhere on the
 * site) can't guarantee a specific duration/easing or an offset for a
 * fixed header, so this is a small manual requestAnimationFrame tween
 * instead — no new dependency, just the Web Animations-adjacent APIs
 * already available in the browser.
 */
function scrollToFAQ() {
  const target = document.getElementById("faq");
  if (!target) return;

  const nav = document.querySelector("header");
  const navOffset = (nav?.getBoundingClientRect().bottom ?? 0) + 24;

  const startY = window.scrollY;
  const targetY = startY + target.getBoundingClientRect().top - navOffset;
  const distance = targetY - startY;

  if (distance === 0) return;

  const startTime = performance.now();

  function step(now: number) {
    const progress = Math.min((now - startTime) / SCROLL_DURATION_MS, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/**
 * The section's closing beat — a short, confident restatement plus a
 * quiet downward cue, mirroring the design system's "Scroll
 * Indicator" component (a subtle pulse rather than an animated
 * arrow) so the page keeps inviting the visitor forward rather than
 * feeling like it has ended. Now a real control: clicking it scrolls
 * to the FAQ section.
 */
export function ClosingStatement() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="mx-auto mt-20 flex max-w-[52ch] flex-col items-center text-center lg:mt-28">
      <motion.h3
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={closingHeadlineVariants}
        className="font-display text-[1.75rem] font-black leading-[1.15] tracking-[-0.01em] text-ink sm:text-4xl"
      >
        A proven process. Built for lasting growth.
      </motion.h3>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={processCopyVariants}
        transition={{ delay: 0.15 }}
        className="mt-4 font-body text-base leading-relaxed text-ink-500 sm:text-lg"
      >
        Every decision has a purpose. Every step moves your brand closer to becoming
        unforgettable.
      </motion.p>

      <motion.button
        type="button"
        onClick={scrollToFAQ}
        aria-label="Scroll to frequently asked questions"
        className="mt-8 flex size-9 items-center justify-center rounded-full border border-ink/10 text-ink-500 transition-colors duration-fast ease-out-premium hover:border-primary hover:text-primary-dark"
        animate={reduceMotion ? undefined : scrollIndicatorAnimation}
        transition={scrollIndicatorTransition}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <ChevronDown className="size-4" strokeWidth={2} aria-hidden="true" />
      </motion.button>
    </div>
  );
}
