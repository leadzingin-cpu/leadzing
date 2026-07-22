import type { LucideIcon } from "lucide-react";
import { Mail, Instagram, MessageCircle } from "lucide-react";

export interface FooterLink {
  label: string;
  href: string;
}

export const FOOTER_NAV_LINKS: FooterLink[] = [
  { label: "Home", href: "#home" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export const FOOTER_SERVICE_LINKS: FooterLink[] = [
  { label: "Brand Strategy", href: "#capabilities" },
  { label: "Social Media Management", href: "#capabilities" },
  { label: "Content Production", href: "#capabilities" },
  { label: "Website Development", href: "#capabilities" },
  { label: "AI Automation", href: "#capabilities" },
  { label: "Performance Marketing", href: "#capabilities" },
];

export interface ContactRow {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const CONTACT_ROWS: ContactRow[] = [
  { icon: Mail, label: "hello@leadzing.in", href: "mailto:hello@leadzing.in" },
  { icon: Instagram, label: "@leadzing.in", href: "https://instagram.com/leadzing.in" },
  { icon: MessageCircle, label: "+91 9874743024", href: "https://wa.me/919874743024" },
];

export interface SocialLink {
  icon: LucideIcon;
  label: string;
  href: string;
}

/** Instagram, WhatsApp, Email — LinkedIn intentionally excluded per brief. */
export const SOCIAL_LINKS: SocialLink[] = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/leadzing.in" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/919874743024" },
  { icon: Mail, label: "Email", href: "mailto:hello@leadzing.in" },
];
