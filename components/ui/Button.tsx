"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-ink hover:bg-primary-light active:bg-primary-dark",
  secondary:
    "bg-transparent text-ink border-2 border-ink/10 hover:border-ink/30 hover:bg-ink/[0.03]",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

/**
 * Primary/secondary CTA button. Hover lifts and brightens (fast,
 * 200ms, ease-out); active/press settles with a slight scale-down —
 * "engineered", never bouncy. Focus ring is never suppressed.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", showArrow = true, className, children, ...props },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-cta font-display font-medium",
          "transition-colors duration-fast ease-out-premium",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        {...props}
      >
        {children}
        {showArrow && (
          <ArrowUpRight
            className="size-4 transition-transform duration-medium ease-out-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
            strokeWidth={2.25}
          />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
