"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * A stylized, generic analytics dashboard — not a screenshot of any
 * real product or platform, and no third-party logos, just an
 * abstract "premium SaaS dashboard" composition in the site's cyan
 * accent on a dark panel, which reads as a deliberate contrast
 * moment against the section's white glass cards. Built from plain
 * SVG/divs so it stays crisp at any size and costs nothing to
 * animate.
 */
export function DashboardMockup() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="w-full max-w-[360px] overflow-hidden rounded-cta border border-white/10 bg-ink p-5 shadow-high sm:p-6"
      style={{
        boxShadow:
          "0 24px 60px rgba(10,11,12,0.35), 0 0 0 1px rgba(18,225,242,0.08), 0 0 48px rgba(18,225,242,0.12)",
      }}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Sparkles className="size-3.5" strokeWidth={2} aria-hidden="true" />
          </span>
          <span className="font-body text-xs font-medium text-white/70">Social Growth</span>
        </div>
        <span className="font-body text-[0.6875rem] text-white/40">Last 30 Days</span>
      </div>

      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="font-display text-2xl font-black text-white">+12.4K</div>
          <div className="font-body text-[0.6875rem] text-white/50">New Followers</div>
        </div>
        <svg className="h-11 w-full max-w-[120px]" viewBox="0 0 120 44" fill="none" aria-hidden="true">
          <path
            d="M2 36 L20 30 L38 33 L56 18 L74 22 L92 9 L118 4"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 36 L20 30 L38 33 L56 18 L74 22 L92 9 L118 4 L118 44 L2 44 Z"
            fill="url(#dashboardGlow)"
            opacity="0.35"
          />
          <defs>
            <linearGradient id="dashboardGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-2">
        {[
          { label: "Reach", value: "1.8M" },
          { label: "Engagement", value: "9.6%" },
          { label: "Profile Visits", value: "45.2K" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-[10px] border border-white/10 bg-white/[0.04] px-2.5 py-2"
          >
            <div className="font-display text-sm font-bold text-white">{stat.value}</div>
            <div className="font-body text-[0.625rem] text-white/45">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-[10px] border border-white/10 bg-white/[0.04] p-3 sm:gap-4">
        <div
          className="relative size-14 shrink-0 rounded-full"
          style={{
            background: `conic-gradient(var(--color-primary) 0% 65%, rgba(255,255,255,0.12) 65% 100%)`,
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-[5px] flex items-center justify-center rounded-full bg-ink">
            <span className="font-display text-xs font-bold text-white">65%</span>
          </div>
        </div>
        <div className="flex min-w-0 items-end gap-1 sm:gap-1.5">
          {[10, 18, 14, 24, 20, 28, 22].map((h, i) => (
            <span
              key={i}
              className="w-1.5 shrink rounded-t-[3px] bg-primary/70 sm:w-2"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
