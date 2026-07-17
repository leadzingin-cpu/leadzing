"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionSubheading } from "./SectionSubheading";
import { SectionDivider } from "./SectionDivider";
import { CoreValueCard } from "./CoreValueCard";
import { LookingAheadCard } from "./LookingAheadCard";
import { CORE_VALUES } from "./aboutData";
import { aboutStaggerContainer, aboutStaggerItem } from "@/animations/aboutModalAnimations";

export function AboutRightPanel() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
      {/* Section 1 — About LeadZing */}
      <section>
        <h2 id="about-modal-heading" className="font-display text-2xl font-black text-ink sm:text-3xl">
          About LeadZing
        </h2>
        <span className="mt-2 block h-1 w-10 rounded-full bg-primary" aria-hidden="true" />

        <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-ink-700">
          LeadZing isn&rsquo;t another marketing agency. We exist to build memorable brands
          through strategy, content production, social media management, websites and creative
          direction.
        </p>
        <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-ink-700">
          Our goal is simple &mdash; to become an extension of every client&rsquo;s business
          rather than just another service provider.
        </p>
      </section>

      <SectionDivider />

      {/* Section 2 — Why I Built LeadZing */}
      <section>
        <SectionSubheading>Why I Built LeadZing</SectionSubheading>

        <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-ink-700">
          I noticed most businesses were spending money on random marketing without a clear
          system. Many agencies deliver content, but they don&rsquo;t build brands.
        </p>
        <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-ink-700">
          LeadZing was created to bridge strategy, creativity and execution into one complete
          experience.
        </p>
        <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-ink-700">
          My mission is to remove guesswork and replace it with clarity, strategy and execution.
        </p>
        <p className="mt-4 font-body text-xs font-semibold uppercase tracking-[0.06em] text-ink-500">
          Owais Raza, Founder
        </p>
      </section>

      <SectionDivider />

      {/* Section 3 — Our Vision */}
      <section>
        <SectionSubheading>Our Vision</SectionSubheading>

        <p className="mt-5 font-display text-lg font-bold leading-snug text-ink sm:text-xl">
          &ldquo;We don&rsquo;t measure success by projects delivered. We measure success by
          brands transformed.&rdquo;
        </p>
        <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-ink-700">
          Every client should leave stronger, more memorable, better positioned, and prepared to
          grow for years &mdash; not weeks.
        </p>
      </section>

      <SectionDivider />

      {/* Section 4 — Our Core Values */}
      <section>
        <SectionSubheading>Our Core Values</SectionSubheading>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={aboutStaggerContainer}
          className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {CORE_VALUES.map((value) => (
            <motion.div key={value.id} variants={aboutStaggerItem}>
              <CoreValueCard value={value} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <SectionDivider />

      {/* Section 5 — Looking Ahead */}
      <LookingAheadCard />

      <SectionDivider />

      {/* Bottom — closing quote */}
      <div className="flex flex-col items-center text-center">
        <Quote className="size-5 text-primary-dark" strokeWidth={2} aria-hidden="true" />
        <p className="mt-3 max-w-[36ch] font-body text-base leading-relaxed text-ink-700">
          Great brands aren&rsquo;t built overnight.
          <br />
          <span className="font-semibold text-ink">They&rsquo;re built intentionally.</span>
        </p>
        <p className="mt-4 font-body text-sm font-semibold text-primary-dark">&mdash; Owais Raza</p>
      </div>
    </div>
  );
}
