"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "./footerData";
import { SocialIconButton } from "./SocialIconButton";
import { footerColumnVariants } from "@/animations/ctaFooterAnimations";

export function FooterBrandColumn() {
  return (
    <motion.div variants={footerColumnVariants} className="flex flex-col items-start">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/logo/logo-icon.png"
          alt="LeadZing"
          width={28}
          height={28}
          className="h-7 w-7"
        />
        <span className="font-display text-xl font-bold tracking-tight text-ink">
          LeadZing
        </span>
      </div>

      <p className="mt-4 max-w-[22ch] font-body text-sm leading-relaxed text-ink-500">
        Building brands people remember.
      </p>

      <div className="mt-6 flex items-center gap-3">
        {SOCIAL_LINKS.map((social) => (
          <SocialIconButton key={social.label} social={social} />
        ))}
      </div>
    </motion.div>
  );
}
