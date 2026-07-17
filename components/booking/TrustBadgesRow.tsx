"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ThumbsUp, Clock, Video } from "lucide-react";
import { staggerContainer, staggerItem } from "@/animations/bookingModalAnimations";

const BADGES = [
  { icon: ShieldCheck, lines: ["Free Strategy", "Session"] },
  { icon: ThumbsUp, lines: ["No Sales", "Pressure"] },
  { icon: Clock, lines: ["Response Within", "24 Hours"] },
  { icon: Video, lines: ["Google Meet", "Invitation Included"] },
] as const;

export function TrustBadgesRow() {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4"
    >
      {BADGES.map(({ icon: Icon, lines }) => (
        <motion.li key={lines[0]} variants={staggerItem} className="flex items-start gap-2">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-dark">
            <Icon className="size-3" strokeWidth={2.5} aria-hidden="true" />
          </span>
          <span className="font-body text-[0.75rem] leading-tight text-ink-500">
            {lines[0]}
            <br />
            {lines[1]}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
