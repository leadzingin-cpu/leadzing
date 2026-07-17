"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  containerClassName?: string;
}

/**
 * Shared input chrome for the booking form: 16px radius, soft border
 * that brightens to the primary color with a cyan focus glow — same
 * "premium focus state" language the brief asks for, built once so
 * every field in the form matches exactly.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, required, containerClassName, className, id, ...props }, ref) => {
    const fieldId = id ?? `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        <label htmlFor={fieldId} className="sr-only">
          {label}
          {required && " (required)"}
        </label>
        <input
          ref={ref}
          id={fieldId}
          required={required}
          className={cn(
            "w-full rounded-base border border-ink/10 bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-ink-300",
            "shadow-low transition-all duration-fast ease-out-premium",
            "focus:border-primary focus:shadow-[0_0_0_3px_rgba(18,225,242,0.18)] focus:outline-none",
            className
          )}
          placeholder={`${label}${required ? " *" : ""}`}
          {...props}
        />
      </div>
    );
  }
);

TextField.displayName = "TextField";
