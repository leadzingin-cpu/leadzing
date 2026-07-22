"use client";

import { motion } from "framer-motion";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useBookingModal } from "@/components/booking/BookingModalContext";
import { faqBottomCTAVariants } from "@/animations/faqAnimations";

export function FAQBottomCTA() {
  const { openModal } = useBookingModal();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={faqBottomCTAVariants}
      className="mt-6 flex flex-col items-start gap-6 rounded-cta border border-white/70 bg-white/70 p-6 shadow-glass backdrop-blur-glass sm:flex-row sm:items-center sm:justify-between sm:p-8"
    >
      <div className="flex items-center gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-dark">
          <CircleHelp className="size-6" strokeWidth={2} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
            Still have a question?
          </h3>
          <p className="mt-1 font-body text-sm leading-relaxed text-ink-500">
            Let&rsquo;s talk about your business.
            <br className="hidden sm:block" /> No pressure. Just honest advice.
          </p>
        </div>
      </div>

      <Button size="lg" onClick={openModal} className="w-full shrink-0 sm:w-auto">
        Book Discovery Call
      </Button>
    </motion.div>
  );
}
