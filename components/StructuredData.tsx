export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LeadZing",
    url: "https://leadzing.in",
    logo: "https://leadzing.in/icon.png",
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