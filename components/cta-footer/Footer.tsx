"use client";

import { motion } from "framer-motion";
import { FooterBrandColumn } from "./FooterBrandColumn";
import { FooterLinksColumn } from "./FooterLinksColumn";
import { FooterContactColumn } from "./FooterContactColumn";
import { FooterGlobeColumn } from "./FooterGlobeColumn";
import { FOOTER_NAV_LINKS, FOOTER_SERVICE_LINKS } from "./footerData";
import { footerColumnsVariants } from "@/animations/ctaFooterAnimations";

/**
 * The premium rounded footer container — a subtly distinct surface
 * (light neutral, soft border, glass) sitting inside the same white
 * section as the closing CTA above it, rather than a separate global
 * layout element. Five columns collapse to two, then one, below
 * `lg`/`sm` with the globe column re-centering itself.
 */
export function Footer() {
  return (
    <div className="mt-24 lg:mt-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={footerColumnsVariants}
        className="rounded-[32px] border border-surface-border bg-surface-subtle/80 p-8 shadow-glass backdrop-blur-glass sm:p-10 lg:p-14"
      >
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_1fr_1.05fr_0.85fr] lg:gap-8">
          <FooterBrandColumn />
          <FooterLinksColumn heading="Navigation" links={FOOTER_NAV_LINKS} />
          <FooterLinksColumn heading="Services" links={FOOTER_SERVICE_LINKS} />
          <FooterContactColumn />
          <FooterGlobeColumn />
        </div>

        <div className="mt-12 border-t border-ink/10 pt-6 lg:mt-14">
          <p className="text-center font-body text-xs text-ink-500">
            &copy; {new Date().getFullYear()} LeadZing. All Rights Reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
