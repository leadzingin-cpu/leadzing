import { FAQ_ITEMS } from "./faqData";

/**
 * FAQPage JSON-LD, generated directly from `FAQ_ITEMS` — the exact
 * same data source the visible accordion renders — so the markup can
 * never drift out of sync with what a user actually sees on the page.
 */
export function FAQStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
