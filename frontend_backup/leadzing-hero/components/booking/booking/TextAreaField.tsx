"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, required, className, id, rows = 4, ...props }, ref) => {
    const fieldId = id ?? `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldId} className="font-body text-sm font-semibold text-ink">
          {label}
          {required && <span className="text-primary-dark"> *</span>}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          required={required}
          rows={rows}
          className={cn(
            "w-full resize-none rounded-base border border-ink/10 bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-ink-300",
            "shadow-low transition-all duration-fast ease-out-premium",
            "focus:border-primary focus:shadow-[0_0_0_3px_rgba(18,225,242,0.18)] focus:outline-none",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

TextAreaField.displayName = "TextAreaField";
