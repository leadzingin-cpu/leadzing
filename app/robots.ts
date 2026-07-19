import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://leadzing.in/sitemap.xml",
    host: "https://leadzing.in",
  };
}