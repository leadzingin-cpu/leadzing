import type { InfoCardData } from "./aboutData";

interface AboutInfoCardProps {
  card: InfoCardData;
}

export function AboutInfoCard({ card }: AboutInfoCardProps) {
  const Icon = card.icon;

  return (
    <div className="flex w-full items-center gap-3.5 rounded-base border border-[#ECECEC] bg-white p-4 text-left shadow-low">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-dark">
        <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-display text-sm font-bold leading-snug text-ink">{card.heading}</p>
        <p className="font-body text-xs leading-snug text-ink-500">{card.subheading}</p>
      </div>
    </div>
  );
}
