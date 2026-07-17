"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { dropdownPanelVariants } from "@/animations/bookingModalAnimations";

interface SelectFieldProps {
  label: string;
  required?: boolean;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * A custom listbox rather than a native `<select>` — the brief asks
 * for a "premium, rounded, animated" dropdown, which native selects
 * can't deliver consistently across browsers. Built as a proper
 * `role="listbox"` combobox: button opens/closes on click or
 * Enter/Space, Escape and outside-click close it; full tab/Enter
 * keyboard use works (arrow-key roving isn't wired, kept simple for
 * this UI-only phase).
 */
export function SelectField({ label, required, options, value, onChange, placeholder }: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useOnClickOutside(containerRef, () => setOpen(false), open);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-sm font-semibold text-ink" id={`${listboxId}-label`}>
        {label}
        {required && <span className="text-primary-dark"> *</span>}
      </label>

      <div ref={containerRef} className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${listboxId}-label`}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          className={cn(
            "flex w-full items-center justify-between rounded-base border border-ink/10 bg-white px-4 py-3 text-left font-body text-sm shadow-low transition-all duration-fast ease-out-premium",
            "focus:border-primary focus:shadow-[0_0_0_3px_rgba(18,225,242,0.18)] focus:outline-none",
            value ? "text-ink" : "text-ink-300"
          )}
        >
          <span>{value || placeholder || "Select an option"}</span>
          <ChevronDown
            className={cn("size-4 shrink-0 text-ink-500 transition-transform duration-fast", open && "rotate-180")}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              aria-labelledby={`${listboxId}-label`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownPanelVariants}
              className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-56 overflow-y-auto rounded-base border border-white/70 bg-white/95 p-1.5 shadow-high backdrop-blur-glass"
            >
              {options.map((option) => {
                const selected = option === value;
                return (
                  <li key={option}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        onChange(option);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-[10px] px-3 py-2.5 text-left font-body text-sm transition-colors duration-fast",
                        selected ? "bg-primary/10 text-ink" : "text-ink-500 hover:bg-ink/[0.04] hover:text-ink"
                      )}
                    >
                      {option}
                      {selected && <Check className="size-3.5 text-primary-dark" strokeWidth={2.5} aria-hidden="true" />}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
