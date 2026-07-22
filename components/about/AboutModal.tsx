"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAboutModal } from "./AboutModalContext";
import { AboutLeftPanel } from "./AboutLeftPanel";
import { AboutRightPanel } from "./AboutRightPanel";
import { CloseButton } from "@/components/booking/CloseButton";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { aboutBackdropVariants, aboutModalVariants } from "@/animations/aboutModalAnimations";
import { cn } from "@/lib/utils";

/**
 * The site's second global modal, deliberately built to feel like a
 * sibling of the booking modal rather than a new pattern: same
 * backdrop treatment, same close behaviors (X / outside click / ESC),
 * same body-scroll lock, same rounded-cta/shadow-high card language.
 * `CloseButton` is imported directly from the booking module rather
 * than duplicated — it's already fully generic (just an onClick prop).
 *
 * Two differences from the booking modal, both intentional: this one
 * adds a real focus trap (Tab/Shift+Tab cycle within the dialog),
 * since the brief asks for it explicitly and this modal is
 * long/scrollable enough that trapping focus actually matters; and
 * its content is two independently-scrollable panels instead of a
 * single scrolling body.
 *
 * SEO/crawlability: unlike a typical modal, this one is *always*
 * mounted in the DOM (no `{isOpen && ...}` unmount) — the About copy
 * (founder story, mission, values) is genuine E-E-A-T content that
 * needs to exist in the server-rendered HTML for search/AI crawlers,
 * which don't simulate clicking "About" to reveal it. Visibility is
 * handled by animating opacity/scale (Framer Motion, same
 * hidden/visible/exit variants the component always used), plus a
 * Tailwind `visible`/`invisible` + `delay-*` pair on the backdrop:
 * visible instantly on open, switched back to `invisible` only after
 * the 250ms exit fade finishes on close. That keeps the closed panel
 * out of the tab order and the accessibility tree (the same goal the
 * HTML `inert` attribute serves) — `inert` itself is deliberately not
 * used here, since toggling it in the same commit as a Framer Motion
 * animation was found, in testing, to freeze that element's opacity
 * tween. (Separately: the backdrop's own fade-in doesn't visibly
 * animate in this project's current framer-motion@11 + React 19
 * combination — confirmed pre-existing on the untouched Booking modal
 * too, so it's not something this change introduced or regressed.)
 */
export function AboutModal() {
  const { isOpen, closeModal } = useAboutModal();
  const containerRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isOpen);
  useOnClickOutside(containerRef, closeModal, isOpen);
  useFocusTrap(containerRef, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeModal]);

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-ink/50 backdrop-blur-sm md:items-center md:p-4 md:py-8 lg:p-6",
        "transition-[visibility]",
        isOpen ? "visible delay-0 pointer-events-auto" : "invisible delay-[250ms] pointer-events-none"
      )}
      initial="hidden"
      animate={isOpen ? "visible" : "exit"}
      variants={aboutBackdropVariants}
      role="presentation"
      aria-hidden={!isOpen}
    >
      <motion.div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-heading"
        animate={isOpen ? "visible" : "exit"}
        variants={aboutModalVariants}
        className="relative flex h-[92dvh] max-h-[92dvh] w-full flex-col overflow-x-hidden overflow-y-auto rounded-t-cta border border-white/60 bg-white shadow-high md:h-auto md:max-h-[85vh] md:w-full md:max-w-[1040px] md:flex-row md:overflow-hidden md:rounded-cta lg:max-h-[88vh]"
        style={{ boxShadow: "0 32px 80px rgba(10,11,12,0.28), 0 0 0 1px rgba(255,255,255,0.4), 0 0 64px rgba(18,225,242,0.10)" }}
      >
        <div className="absolute right-4 top-4 z-30 sm:right-6 sm:top-6">
          <CloseButton onClick={closeModal} />
        </div>

        <AboutLeftPanel />
        <AboutRightPanel />
      </motion.div>
    </motion.div>
  );
}
