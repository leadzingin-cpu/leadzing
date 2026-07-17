interface SectionSubheadingProps {
  children: React.ReactNode;
}

/** The small turquoise ring-and-dot bullet preceding each sub-section heading in the right panel. */
export function SectionSubheading({ children }: SectionSubheadingProps) {
  return (
    <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-ink sm:text-xl">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-primary" aria-hidden="true">
        <span className="size-2 rounded-full bg-primary" />
      </span>
      {children}
    </h3>
  );
}
