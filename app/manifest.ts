import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LeadZing | Branding, Social Media & Website Development Agency",
    short_name: "LeadZing",
    description:
      "LeadZing is a premium brand marketing agency helping ambitious businesses grow through branding, social media management, content production, website development, AI systems, and creative storytelling.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0A0B0C",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
