"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface CloseButtonProps {
  onClick: () => void;
}

export function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Close booking dialog"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/80 text-ink-500 shadow-glass backdrop-blur-glass transition-colors duration-fast ease-out-premium hover:text-ink hover:shadow-[0_0_0_4px_rgba(18,225,242,0.18)] sm:size-10"
    >
      <X className="size-4" strokeWidth={2} aria-hidden="true" />
    </motion.button>
  );
}
