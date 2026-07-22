"use client";

import { Container } from "@/components/ui/Container";
import { FAQLeftPanel } from "@/components/faq/FAQLeftPanel";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { FAQBottomCTA } from "@/components/faq/FAQBottomCTA";
import { FAQStructuredData } from "@/components/faq/FAQStructuredData";

/**
 * Section 7 — "FAQ". Sits between Process and Final CTA. Same
 * left-header-beside-content rhythm as Process/Final CTA (Container,
 * white background, no hard divider from neighboring sections) rather
 * than a new layout language — two columns on desktop that stack to a
 * single column on mobile (text first, accordion second, in natural
 * DOM order), with the CTA card spanning full width beneath both.
 */
export function FAQ() {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="relative overflow-hidden bg-white pt-8 pb-28 lg:pb-36 lg:pt-12">
      <FAQStructuredData />
      <Container className="relative max-w-container-wide">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <FAQLeftPanel />

          <div>
            <FAQAccordion />
            <FAQBottomCTA />
          </div>
        </div>
      </Container>
    </section>
  );
}
