"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassTypography } from "@/components/ui/GlassTypography";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ambientGlowBackground } from "@/styles/glassEffects";
import {
  headlineLineVariants,
  supportingCopyVariants,
  hierarchyContainerVariants,
  hierarchyWordVariants,
  dustParticleTransition,
} from "@/animations/problemAnimations";

const HEADLINE_LINES = ["Great businesses", "don't always", "get noticed."];

const HIERARCHY = [
  { label: "CONSISTENCY", opacity: 0.35, scale: 1 },
  { label: "TRUST", opacity: 0.2, scale: 0.9 },
  { label: "STRATEGY", opacity: 0.09, scale: 0.82 },
];

/** Fixed positions (not random) so server and client markup match exactly — avoids hydration mismatch. */
const DUST_PARTICLES = [
  { top: "18%", left: "12%", size: 3 },
  { top: "28%", left: "82%", size: 2 },
  { top: "46%", left: "6%", size: 2 },
  { top: "62%", left: "90%", size: 3 },
  { top: "72%", left: "22%", size: 2 },
  { top: "34%", left: "48%", size: 2 },
  { top: "80%", left: "60%", size: 3 },
  { top: "14%", left: "58%", size: 2 },
];

/**
 * Section 2 — "The Invisible Problem". The emotional turning point
 * between Hero and Capabilities: names the real problem (visibility,
 * not quality) before the rest of the site presents the fix.
 */
export function InvisibleProblem() {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Gentle continuous rise across the whole section — the "VISIBILITY
  // drifts upward, glow fades" exit behavior the brief asks for, done
  // as one smooth scroll-linked transform rather than a separate
  // exit-only animation.
  const centerpieceY = useTransform(scrollYProgress, [0.55, 1], [0, -64]);
  const centerpieceOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0.55]);

  return (
    <section
      ref={sectionRef}
      id="problem"
      aria-label="The invisible problem"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-white py-28 lg:min-h-[110vh]"
    >
      {/* Extremely soft radial cyan glow behind VISIBILITY — the only color in an otherwise white scene */}
      <div
        className="pointer-events-none absolute left-1/2 top-[58%] h-[42rem] w-[70rem] -translate-x-1/2 -translate-y-1/2"
        style={{ background: ambientGlowBackground(0.07) }}
        aria-hidden="true"
      />

      {/* Floating dust particles — fixed positions, gentle drift, skipped under reduced motion */}
      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {DUST_PARTICLES.map((particle, i) => (
            <motion.span
              key={`${particle.top}-${particle.left}`}
              className="absolute rounded-full bg-primary/25"
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.size,
                height: particle.size,
              }}
              animate={{ y: [0, -18, 0], opacity: [0.15, 0.5, 0.15] }}
              transition={dustParticleTransition(i)}
            />
          ))}
        </div>
      )}

      <Container className="relative flex max-w-container-wide flex-col items-center text-center">
        <SectionLabel className="mb-8">The Invisible Problem</SectionLabel>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          transition={{ staggerChildren: 0.12 }}
          className="mx-auto max-w-[20ch] font-display text-[2.75rem] font-black leading-[1.05] tracking-[-0.02em] text-ink sm:text-[4rem] lg:text-[5.5rem]"
        >
          {HEADLINE_LINES.map((line) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span variants={headlineLineVariants} className="block">
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          className="mx-auto mt-8 max-w-[42ch] font-body text-lg leading-relaxed text-ink-500 sm:text-xl"
        >
          <motion.p variants={supportingCopyVariants}>
            Not because they lack quality&hellip;
          </motion.p>
          <motion.p variants={supportingCopyVariants} className="mt-2">
            But because the{" "}
            <span className="font-semibold text-primary-dark">right people</span> never
            discover them.
          </motion.p>
        </motion.div>

        <motion.div
          style={{
            y: reduceMotion ? 0 : centerpieceY,
            opacity: reduceMotion ? 1 : centerpieceOpacity,
          }}
          className="mt-16 w-full sm:mt-20 lg:mt-24"
        >
          <GlassTypography
            text="VISIBILITY"
            className="text-[clamp(2.75rem,13vw,3.5rem)] sm:text-[6rem] lg:text-display"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={hierarchyContainerVariants}
            className="mx-auto mt-2 flex flex-col items-center gap-1"
            aria-hidden="true"
          >
            {HIERARCHY.map((item, i) => (
              <motion.div
                key={item.label}
                variants={hierarchyWordVariants}
                className="flex flex-col items-center"
                style={{ opacity: item.opacity, scale: item.scale }}
              >
                {i > 0 && (
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    className="mb-1 text-ink-300"
                  >
                    <path
                      d="M5 0v13M1 9l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <span className="font-display text-xl font-bold uppercase tracking-[0.08em] text-ink sm:text-2xl">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
