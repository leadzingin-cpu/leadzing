import type { CoreValueData } from "./aboutData";

interface CoreValueCardProps {
  value: CoreValueData;
}

export function CoreValueCard({ value }: CoreValueCardProps) {
  const Icon = value.icon;

  return (
    <div className="flex flex-col gap-3 rounded-base border border-[#ECECEC] bg-white p-4 shadow-low sm:p-5">
      <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary-dark">
        <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
      </span>
      <div>
        <p className="font-display text-sm font-bold leading-snug text-ink">{value.title}</p>
        <p className="mt-1 font-body text-xs leading-relaxed text-ink-500">{value.description}</p>
      </div>
    </div>
  );
}
