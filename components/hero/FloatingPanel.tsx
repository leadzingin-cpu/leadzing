"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FloatingPanelData } from "./panelsData";

interface FloatingPanelProps {
  panel: FloatingPanelData;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduceMotion: boolean;
}

function PanelVisual({ id }: { id: string }) {
  switch (id) {
    case "analytics":
      return (
        <div className="flex items-end justify-between">
          <svg width="64" height="28" viewBox="0 0 64 28" fill="none" aria-hidden="true">
            <path
              d="M2 22 L16 16 L28 19 L42 8 L62 3"
              stroke="var(--color-primary-dark)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display text-sm font-bold text-ink">+145%</span>
        </div>
      );
    case "website":
      return (
        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-3 h-2 rounded-sm bg-ink/10" />
          <div className="h-8 rounded-sm bg-primary/20" />
          <div className="col-span-2 flex flex-col gap-1">
            <div className="h-2 rounded-sm bg-ink/10" />
            <div className="h-2 w-2/3 rounded-sm bg-ink/10" />
          </div>
        </div>
      );
    case "content":
      return (
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm"
              style={{
                background:
                  i % 2 === 0
                    ? "linear-gradient(135deg, var(--color-primary-light), var(--color-primary))"
                    : "var(--neutral-300)",
              }}
            />
          ))}
        </div>
      );
    case "brand":
      return (
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold text-ink">Aa</span>
          <div className="flex gap-1">
            {["#0A0B0C", "var(--color-primary)", "var(--color-primary-light)", "#B0B0B5"].map(
              (color, i) => (
                <span
                  key={i}
                  className="h-4 w-2.5 rounded-[2px]"
                  style={{ backgroundColor: color }}
                />
              )
            )}
          </div>
        </div>
      );
    case "performance":
      return (
        <div className="flex items-center gap-3">
          <div
            className="relative flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(var(--color-primary) 78%, var(--neutral-300) 0)`,
            }}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[0.6rem] font-bold text-ink">
              78%
            </div>
          </div>
          <div className="flex items-end gap-0.5">
            {[6, 10, 8, 14, 11].map((h, i) => (
              <span
                key={i}
                className="w-1.5 rounded-t-[2px] bg-primary"
                style={{ height: `${h * 2}px` }}
              />
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

/**
 * A single floating "holographic" glass card orbiting Zingy. Motion:
 * enters with a soft fade + rise on load, then drifts a few pixels
 * with cursor parallax (depth-scaled) and idles with a slow vertical
 * bob. All motion is skipped when reduced motion is preferred —
 * panels simply fade in and hold still.
 */
export function FloatingPanel({
  panel,
  parallaxX,
  parallaxY,
  reduceMotion,
}: FloatingPanelProps) {
  const Icon = panel.icon;
  const x = useTransform(parallaxX, (v) => v * panel.depth * 10);
  const y = useTransform(parallaxY, (v) => v * panel.depth * 10);

  return (
    <motion.div
      className={cn(
        "absolute hidden rounded-base border border-white/70 bg-white/80 p-3.5 shadow-glass backdrop-blur-glass md:block",
        panel.size === "md" ? "w-[168px]" : "w-[148px]"
      )}
      style={{ ...panel.position, x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y }}
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: panel.delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : { y: [0, -6, 0] }
        }
        transition={{
          duration: 5 + panel.depth * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: panel.delay,
        }}
      >
        <div className="mb-2 flex items-center gap-1.5">
          <Icon className="size-3.5 text-primary-dark" strokeWidth={2} aria-hidden="true" />
          <span className="font-body text-[0.6875rem] font-medium text-ink-500">
            {panel.label}
          </span>
        </div>
        <PanelVisual id={panel.id} />
      </motion.div>
    </motion.div>
  );
}
