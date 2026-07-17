"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AVAILABLE_TIME_SLOTS } from "./bookingData";

interface TimeSlotPickerProps {
  selectedTime: string | null;
  onSelect: (time: string) => void;
}

export function TimeSlotPicker({ selectedTime, onSelect }: TimeSlotPickerProps) {
  return (
    <div>
      <h3 className="mb-3 font-display text-sm font-bold text-ink">Available Times</h3>
      <div className="flex flex-col gap-2.5">
        {AVAILABLE_TIME_SLOTS.map((time) => {
          const selected = time === selectedTime;
          return (
            <motion.button
              key={time}
              type="button"
              onClick={() => onSelect(time)}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              aria-pressed={selected}
              className={cn(
                "w-full rounded-base border px-4 py-2.5 text-left font-body text-sm font-medium transition-all duration-fast ease-out-premium",
                selected
                  ? "border-primary bg-primary/10 text-ink shadow-[0_0_0_3px_rgba(18,225,242,0.18)]"
                  : "border-ink/10 bg-white text-ink-700 hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              {time}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
