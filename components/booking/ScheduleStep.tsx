"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Calendar } from "./Calendar";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { TimezoneDisplay } from "./TimezoneDisplay";

interface ScheduleStepProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
  onContinue: () => void;
}

export function ScheduleStep({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onContinue,
}: ScheduleStepProps) {
  const canContinue = Boolean(selectedDate && selectedTime);

  return (
    <div>
      <h3 className="mb-5 font-display text-xl font-bold text-ink sm:text-2xl">Select a Date</h3>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1.2fr_1fr]">
        <Calendar selectedDate={selectedDate} onSelect={onSelectDate} />

        <div className="flex flex-col gap-6">
          <TimeSlotPicker selectedTime={selectedTime} onSelect={onSelectTime} />
          <TimezoneDisplay />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-8 flex justify-end border-t border-ink/10 pt-6"
      >
        <Button
          type="button"
          size="lg"
          disabled={!canContinue}
          onClick={onContinue}
          className="w-full disabled:pointer-events-none disabled:opacity-40 sm:w-auto"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
}
