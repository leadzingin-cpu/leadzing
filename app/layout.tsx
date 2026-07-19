import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { BookingModalProvider } from "@/components/booking/BookingModalContext";
import { AboutModalProvider } from "@/components/about/AboutModalContext";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://leadzing.in"),

  title: {
  default: "LeadZing | Branding, Social Media & Website Development Agency",
  template: "%s | LeadZing",
},

  description:
    "LeadZing is a premium brand marketing agency helping ambitious businesses grow through branding, social media management, content production, website development, AI systems, and creative storytelling.",

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

  authors: [{ name: "LeadZing" }],

  creator: "LeadZing",

  publisher: "LeadZing",

  applicationName: "LeadZing",

  category: "Marketing",

  alternates: {
    canonical: "https://leadzing.in",
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

  url: "https://leadzing.in",
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

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body className="font-body">
        <BookingModalProvider>
          <AboutModalProvider>
            <SmoothScrollProvider>
              <Navbar />
              <main>{children}</main>
            </SmoothScrollProvider>
          </AboutModalProvider>
        </BookingModalProvider>
      </body>
    </html>
  );
}
