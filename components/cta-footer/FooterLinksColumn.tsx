"use client";

import { motion } from "framer-motion";
import type { FooterLink } from "./footerData";
import { footerColumnVariants } from "@/animations/ctaFooterAnimations";
import { useAboutModal } from "@/components/about/AboutModalContext";

interface FooterLinksColumnProps {
  heading: string;
  links: FooterLink[];
}

export function FooterLinksColumn({ heading, links }: FooterLinksColumnProps) {
  const { openModal: openAboutModal } = useAboutModal();

  /**
   * There is no `#about` section — the About content lives in a modal.
   * The Navbar already intercepts its own "About" link for this reason;
   * the footer's copy of that link had no handler, so it pointed at a
   * non-existent anchor and did nothing when clicked. This mirrors the
   * Navbar's behaviour so both entry points work the same way.
   */
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    if (label !== "About") return;
    e.preventDefault();
    openAboutModal();
  };
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
              onClick={(e) => handleClick(e, link.label)}
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
