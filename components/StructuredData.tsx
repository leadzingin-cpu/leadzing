/**
 * Organization + founder schema. Every field here is sourced from
 * content that already exists elsewhere on the site (footer contact
 * rows, About modal founder credit) — nothing invented for the sake
 * of markup, per the site's no-fake-authority policy.
 */
export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://leadzing.in/#organization",
    name: "LeadZing",
    legalName: "LeadZing",
    url: "https://leadzing.in",
    logo: {
      "@type": "ImageObject",
      url: "https://leadzing.in/icon.png",
      width: 512,
      height: 512,
    },
    image: "https://leadzing.in/opengraph-image",
    email: "hello@leadzing.in",
    telephone: "+91 9874743024",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressCountry: "IN",
    },
    areaServed: "India",
    description:
      "LeadZing is a premium brand marketing agency helping ambitious businesses grow through branding, social media management, content production, website development, AI systems, and creative storytelling.",
    slogan: "Building Brands People Remember.",
    founder: {
      "@type": "Person",
      name: "Owais Raza",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@leadzing.in",
      telephone: "+91 9874743024",
      areaServed: "IN",
      availableLanguage: ["English"],
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