"use client";

import { motion } from "framer-motion";
import { BarChart3, Search, Sparkles, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WidgetData } from "./widgetsData";
import { widgetVariants } from "@/animations/capabilitiesAnimations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface FloatingWidgetProps {
  widget: WidgetData;
}

function WidgetVisual({ visual }: { visual: WidgetData["visual"] }) {
  switch (visual) {
    case "social":
      return (
        <div className="flex items-end justify-between">
          <div>
            <div className="font-display text-lg font-bold text-ink">28.4K</div>
            <div className="font-body text-[0.6875rem] text-ink-500">Followers</div>
          </div>
          <span className="font-body text-[0.6875rem] font-semibold text-success">
            &uarr; 38%
          </span>
        </div>
      );
    case "ads":
      return (
        <div className="flex items-end justify-between">
          <div>
            <div className="font-display text-lg font-bold text-ink">4.6x</div>
            <div className="font-body text-[0.6875rem] text-ink-500">ROI</div>
          </div>
          <span className="font-body text-[0.6875rem] font-semibold text-success">
            &uarr; 67%
          </span>
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
    case "seo":
      return (
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-1.5">
            <Search className="size-3.5 text-primary-dark" strokeWidth={2} aria-hidden="true" />
            <span className="font-display text-lg font-bold text-ink">#1</span>
          </div>
          <span className="font-body text-[0.6875rem] font-semibold text-success">
            &uarr; 23 pos
          </span>
        </div>
      );
    case "workflow":
      return (
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="flex items-center">
              <span
                className={cn(
                  "flex size-4 items-center justify-center rounded-full",
                  i % 2 === 0 ? "bg-primary/20" : "bg-ink/10"
                )}
              >
                <Sparkles className="size-2.5 text-primary-dark" strokeWidth={2} aria-hidden="true" />
              </span>
              {i < 3 && <span className="h-px w-2.5 bg-ink/15" />}
            </span>
          ))}
        </div>
      );
    case "email":
      return (
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-1.5">
            <Mail className="size-3.5 text-primary-dark" strokeWidth={2} aria-hidden="true" />
            <span className="font-display text-lg font-bold text-ink">56%</span>
          </div>
          <svg width="44" height="22" viewBox="0 0 44 22" fill="none" aria-hidden="true">
            <path
              d="M2 18 L12 12 L20 15 L28 6 L42 2"
              stroke="var(--color-primary-dark)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

const VISUAL_ICON: Record<WidgetData["visual"], typeof BarChart3> = {
  social: Sparkles,
  ads: BarChart3,
  website: BarChart3,
  seo: Search,
  workflow: Sparkles,
  email: Mail,
};

/**
 * A single "proof" widget floating in the right-hand column — same
 * glass-card + gentle idle bob language as the Hero's holographic
 * panels, kept to this section so the two moments don't compete.
 */
export function FloatingWidget({ widget }: FloatingWidgetProps) {
  const reduceMotion = usePrefersReducedMotion();
  const Icon = VISUAL_ICON[widget.visual];

  return (
    <motion.div
      variants={widgetVariants}
      className={cn(
        "w-[172px] rounded-base border border-white/70 bg-white/80 p-3.5 shadow-glass backdrop-blur-glass sm:w-[188px]",
        widget.align === "end" ? "self-end" : "self-start"
      )}
      style={{ transitionDelay: `${widget.delay}s` }}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: widget.delay }}
      >
        <div className="mb-2 flex items-center gap-1.5">
          <Icon className="size-3.5 text-primary-dark" strokeWidth={2} aria-hidden="true" />
          <span className="font-body text-[0.6875rem] font-medium text-ink-500">
            {widget.label}
          </span>
        </div>
        <WidgetVisual visual={widget.visual} />
      </motion.div>
    </motion.div>
  );
}
