import { TrendingUp, ChevronRight } from "lucide-react";

export function LookingAheadCard() {
  return (
    <div
      className="relative overflow-hidden rounded-base p-6 text-white sm:p-7"
      style={{ background: "linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
            <span className="font-display text-sm font-bold uppercase tracking-[0.04em]">
              Looking Ahead
            </span>
          </div>

          <p className="mt-3 font-body text-xs text-white/80">Our ambition is simple:</p>
          <p className="mt-1 font-display text-base font-bold leading-snug sm:text-lg">
            To become the creative partner behind India&rsquo;s next generation of unforgettable
            brands.
          </p>
        </div>

        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-primary-dark shadow-high"
          aria-hidden="true"
        >
          <ChevronRight className="size-5" strokeWidth={2.5} />
        </span>
      </div>
    </div>
  );
}
