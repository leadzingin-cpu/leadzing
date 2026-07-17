"use client";

import { motion } from "framer-motion";
import { CONTACT_ROWS } from "./footerData";
import { footerColumnVariants } from "@/animations/ctaFooterAnimations";

export function FooterContactColumn() {
  return (
    <motion.div variants={footerColumnVariants} className="flex flex-col items-start">
      <h3 className="font-mono text-xs font-semibold uppercase text-primary-dark" style={{ letterSpacing: "0.15em" }}>
        Contact
      </h3>
      <ul className="mt-5 flex flex-col gap-3.5">
        {CONTACT_ROWS.map((row) => {
          const Icon = row.icon;
          return (
            <li key={row.label}>
              <a
                href={row.href}
                target={row.href.startsWith("http") ? "_blank" : undefined}
                rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-2.5 font-body text-sm text-ink-500 transition-colors duration-fast ease-out-premium hover:text-ink"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-dark transition-colors duration-fast group-hover:bg-primary/20">
                  <Icon className="size-3.5" strokeWidth={2} aria-hidden="true" />
                </span>
                {row.label}
              </a>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
