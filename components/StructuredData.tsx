import { CAPABILITIES } from "@/components/capabilities/capabilitiesData";

/**
 * Site-wide entity graph. Every field here is sourced from content that
 * already exists elsewhere on the site (footer contact rows, About modal
 * founder credit, the Capabilities grid) — nothing invented for the sake
 * of markup, per the site's no-fake-authority policy.
 *
 * Deliberately NOT included, because the supporting facts don't exist yet:
 *   - aggregateRating / review  — no verified reviews are published
 *   - SearchAction              — the site has no search feature
 *   - streetAddress / postalCode — not published anywhere on the site
 * Adding any of those would be marking up claims we can't substantiate,
 * which is exactly what Google's structured-data guidelines prohibit.
 *
 * Emitted as a single @graph so the nodes reference each other by @id
 * instead of repeating the organization inline in every node.
 */

const SITE_URL = "https://leadzing.in";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const FOUNDER_ID = `${SITE_URL}/#owais-raza`;

/** Service nodes are generated from the same array the Capabilities grid
 *  renders, so the markup can never drift out of sync with the visible
 *  service list — the same guarantee FAQStructuredData gives for the FAQ. */
const serviceNodes = CAPABILITIES.map((capability) => ({
  "@type": "Service",
  "@id": `${SITE_URL}/#service-${capability.id}`,
  name: capability.title,
  description: capability.description,
  serviceType: capability.title,
  url: `${SITE_URL}/#capabilities`,
  provider: { "@id": ORG_ID },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
}));

export default function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: "LeadZing",
        legalName: "LeadZing",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: `${SITE_URL}/icon.png`,
          width: 512,
          height: 512,
        },
        image: { "@id": `${SITE_URL}/#logo` },
        email: "hello@leadzing.in",
        telephone: "+91 9874743024",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kolkata",
          addressRegion: "West Bengal",
          addressCountry: "IN",
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        description:
          "LeadZing is a brand marketing agency in Kolkata helping ambitious businesses grow through brand strategy, social media management, content production, website development, AI automation, and performance marketing — delivered as one connected system.",
        slogan: "Building Brands People Remember.",
        founder: { "@id": FOUNDER_ID },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "hello@leadzing.in",
          telephone: "+91 9874743024",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Bengali"],
        },
        sameAs: ["https://instagram.com/leadzing.in"],
        knowsAbout: [
          "Brand Strategy",
          "Social Media Management",
          "Content Production",
          "Website Development",
          "AI Automation",
          "Performance Marketing",
        ],
        // Ties the six Service nodes below back to the organization as a
        // single, machine-readable service catalogue.
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "LeadZing Services",
          itemListElement: CAPABILITIES.map((capability) => ({
            "@type": "Offer",
            itemOffered: { "@id": `${SITE_URL}/#service-${capability.id}` },
          })),
        },
      },

      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: "LeadZing",
        description:
          "Brand marketing agency in Kolkata — strategy, content, websites, AI automation and performance marketing as one connected system.",
        publisher: { "@id": ORG_ID },
        inLanguage: "en-IN",
      },

      {
        "@type": "Person",
        "@id": FOUNDER_ID,
        name: "Owais Raza",
        jobTitle: "Founder",
        worksFor: { "@id": ORG_ID },
        url: SITE_URL,
        knowsAbout: [
          "Brand Strategy",
          "Marketing Strategy",
          "Content Production",
          "Website Development",
        ],
      },

      ...serviceNodes,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph),
      }}
    />
  );
}
