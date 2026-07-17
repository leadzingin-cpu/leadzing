"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { successIconTransition } from "@/animations/bookingModalAnimations";

interface SuccessScreenProps {
  onReturn: () => void;
}

export function SuccessScreen({ onReturn }: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center px-2 py-8 text-center sm:py-10">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={successIconTransition}
        className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary-dark"
      >
        <CheckCircle2 className="size-10" strokeWidth={1.75} aria-hidden="true" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 font-display text-2xl font-black text-ink sm:text-3xl"
      >
        Discovery Call Requested!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 max-w-[38ch] font-body text-base leading-relaxed text-ink-500"
      >
        We&rsquo;ve received your booking request. You&rsquo;ll receive a confirmation once your
        meeting is scheduled.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 w-full sm:w-auto"
      >
        <Button type="button" size="lg" onClick={onReturn} showArrow={false} className="w-full sm:w-auto">
          Return to Website
        </Button>
      </motion.div>
    </div>
  );
}
