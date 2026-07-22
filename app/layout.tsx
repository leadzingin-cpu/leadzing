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
  title: "LeadZing — Building Brands People Remember",
  description:
    "LeadZing is a premium creative marketing agency helping ambitious businesses grow through brand strategy, content, websites and creative storytelling.",
  metadataBase: new URL("https://leadzing.in"),
  openGraph: {
    title: "LeadZing — Building Brands People Remember",
    description:
      "We transform ambitious businesses into unforgettable brands through strategy, content, websites and creative storytelling.",
    type: "website",
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
