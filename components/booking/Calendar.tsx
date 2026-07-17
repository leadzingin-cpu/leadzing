"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface CalendarCell {
  date: Date;
  inCurrentMonth: boolean;
}

function buildMonthGrid(year: number, month: number): CalendarCell[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: CalendarCell[] = [];

  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), inCurrentMonth: false });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ date: new Date(year, month, day), inCurrentMonth: true });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1]?.date ?? new Date(year, month, daysInMonth);
    const next = new Date(last);
    next.setDate(next.getDate() + 1);
    cells.push({ date: next, inCurrentMonth: false });
  }

  return cells;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function startOfToday(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

interface CalendarProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}

export function Calendar({ selectedDate, onSelect }: CalendarProps) {
  const today = useMemo(startOfToday, []);
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const cells = useMemo(
    () => buildMonthGrid(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  );

  const goToPrevMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goToNextMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  // Don't allow navigating to months entirely in the past.
  const canGoPrev =
    viewDate.getFullYear() > today.getFullYear() ||
    (viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() > today.getMonth());

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPrevMonth}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="flex size-8 items-center justify-center rounded-full text-ink-500 transition-colors duration-fast hover:bg-ink/5 hover:text-ink disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="size-4" strokeWidth={2} aria-hidden="true" />
        </button>

        <span className="font-display text-sm font-bold text-ink">
          {MONTH_LABELS[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>

        <button
          type="button"
          onClick={goToNextMonth}
          aria-label="Next month"
          className="flex size-8 items-center justify-center rounded-full text-ink-500 transition-colors duration-fast hover:bg-ink/5 hover:text-ink"
        >
          <ChevronRight className="size-4" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className="py-1.5 font-body text-[0.6875rem] font-medium uppercase text-ink-500">
            {label}
          </span>
        ))}

        {cells.map(({ date, inCurrentMonth }) => {
          const disabled = date < today;
          const selected = selectedDate ? isSameDay(date, selectedDate) : false;
          const isToday = isSameDay(date, today);

          return (
            <div key={date.toISOString()} className="flex items-center justify-center py-0.5">
              <motion.button
                type="button"
                disabled={disabled}
                onClick={() => onSelect(date)}
                whileHover={disabled ? undefined : { scale: 1.08 }}
                whileTap={disabled ? undefined : { scale: 0.94 }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                aria-current={isToday ? "date" : undefined}
                aria-pressed={selected}
                className={cn(
                  "relative flex aspect-square w-full max-w-9 items-center justify-center rounded-full font-body text-sm transition-colors duration-fast",
                  !inCurrentMonth && "text-ink-300",
                  inCurrentMonth && !disabled && !selected && "text-ink hover:bg-primary/10",
                  disabled && "cursor-not-allowed text-ink-300",
                  selected && "bg-primary font-bold text-ink shadow-[0_0_0_4px_rgba(18,225,242,0.18)]"
                )}
              >
                {date.getDate()}
                {isToday && !selected && (
                  <span className="absolute bottom-1 size-1 rounded-full bg-primary-dark" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
