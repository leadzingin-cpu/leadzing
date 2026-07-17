"use client";

import { Container } from "@/components/ui/Container";
import { ClosingCTA } from "@/components/cta-footer/ClosingCTA";
import { Footer } from "@/components/cta-footer/Footer";

/**
 * Section 6 (final) — "Final CTA & Footer". The site's closing beat:
 * a hero-scale call to action followed by the footer, both living
 * inside one continuous white section (no hard divider from Process)
 * so the page ends on a single, unbroken moment rather than a
 * separate "footer page". The footer is scoped to this page's
 * composition rather than the global layout, matching how every
 * other section here is assembled directly in `app/page.tsx`.
 */
export function FinalCTA() {
  return (
    <section id="contact" aria-label="Get started" className="relative overflow-hidden bg-white py-28 lg:py-36">
      <Container className="relative max-w-container-wide">
        <ClosingCTA />
        <Footer />
      </Container>
    </section>
  );
}
