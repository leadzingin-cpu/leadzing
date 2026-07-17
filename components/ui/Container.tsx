import type { HTMLAttributes, ElementType } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Render as a different element (e.g. "section", "article") while keeping the same width/padding rules. */
  as?: ElementType;
}

/**
 * Shared max-width + horizontal padding wrapper used by every section
 * on the page, so content alignment stays identical across Hero,
 * Invisible Problem, Capabilities, etc. without each section
 * reimplementing its own container math.
 *
 * Matches the design system's container spec: max-width 75rem
 * (1200px), 1.5rem side padding on mobile scaling to 3rem on desktop.
 * Sections that need a wider stage (e.g. Invisible Problem's 1400px
 * VISIBILITY centerpiece) pass `className="max-w-container-wide"` to
 * override — see tailwind.config.ts for that token.
 *
 * Accepts every standard `<div>` prop (id, onClick, aria-*, data-*,
 * etc.) via spread, plus an `as` prop to render a different element
 * (e.g. `as="section"`) while keeping identical width/padding rules.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-container px-6 sm:px-8 lg:px-12", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}