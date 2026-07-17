"use client";

import { motion } from "framer-motion";
import type { FooterLink } from "./footerData";
import { footerColumnVariants } from "@/animations/ctaFooterAnimations";

interface FooterLinksColumnProps {
  heading: string;
  links: FooterLink[];
}

export function FooterLinksColumn({ heading, links }: FooterLinksColumnProps) {
  return (
    <motion.div variants={footerColumnVariants} className="flex flex-col items-start">
      <h3 className="font-mono text-xs font-semibold uppercase text-primary-dark" style={{ letterSpacing: "0.15em" }}>
        {heading}
      </h3>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="font-body text-sm text-ink-500 transition-colors duration-fast ease-out-premium hover:text-ink"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
