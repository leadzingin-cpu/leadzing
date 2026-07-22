import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { BookingModalProvider } from "@/components/booking/BookingModalContext";
import { AboutModalProvider } from "@/components/about/AboutModalContext";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const SITE_URL = "https://leadzing.in";
const GA_MEASUREMENT_ID = "G-LRHM4FBWR0";

const geist = Geist({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-geist",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0B0C",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "LeadZing | Building Brands Poeple Remember",
    template: "%s | LeadZing",
  },

  description:
    "LeadZing combines branding, brand strategy, social media management, content production, website development, and AI automation to build brands people remember.",

  keywords: [
    "LeadZing",
    "Brand Marketing Agency",
    "Creative Agency",
    "Branding Agency",
    "Social Media Marketing",
    "Social Media Management",
    "Content Production",
    "Website Development",
    "Web Design",
    "Marketing Agency India",
    "Brand Strategy",
    "Content Marketing",
    "Video Production",
    "AI Automation",
    "Digital Marketing",
  ],

  authors: [{ name: "LeadZing", url: SITE_URL }],
  creator: "LeadZing",
  publisher: "LeadZing",
  applicationName: "LeadZing",
  category: "Marketing",

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "LeadZing | Brand Marketing Agency",
    description:
      "We build unforgettable brands through strategy, content, websites, AI systems and creative storytelling.",
    url: SITE_URL,
    siteName: "LeadZing",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "LeadZing | Brand Marketing Agency",
    description:
      "Helping ambitious businesses grow through branding, content, websites and AI systems.",
  },

  // icon.png, apple-icon.tsx, and manifest.ts are picked up automatically
  // via Next.js file conventions — declaring them here too would duplicate
  // <link> tags.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body className="font-body">
        <StructuredData />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-base focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <BookingModalProvider>
          <AboutModalProvider>
            <SmoothScrollProvider>
              <Navbar />
              <main id="main-content">{children}</main>
            </SmoothScrollProvider>
          </AboutModalProvider>
        </BookingModalProvider>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
