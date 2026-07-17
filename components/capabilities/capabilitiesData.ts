import type { LucideIcon } from "lucide-react";
import { Compass, Calendar, Camera, MonitorSmartphone, Bot, BarChart3 } from "lucide-react";

export interface CapabilityData {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /** Grid row (0-indexed) this card sits in — used to align its connector line into the hub. */
  row: 0 | 1 | 2;
}

/**
 * The six core service pillars, arranged as a 2-column x 3-row grid
 * that mirrors the reading order of the approved reference layout
 * (left column top-to-bottom, then right column top-to-bottom).
 */
export const CAPABILITIES: CapabilityData[] = [
  {
    id: "brand-strategy",
    icon: Compass,
    title: "Brand Strategy",
    description: "Position your brand. Own your market.",
    row: 0,
  },
  {
    id: "social-media",
    icon: Calendar,
    title: "Social Media Management",
    description: "Plan. Create. Engage. Grow your audience.",
    row: 0,
  },
  {
    id: "content-production",
    icon: Camera,
    title: "Content Production",
    description: "Scroll-stopping content that converts.",
    row: 1,
  },
  {
    id: "website-development",
    icon: MonitorSmartphone,
    title: "Website Development",
    description: "Fast. Modern. Optimized. Built to perform.",
    row: 1,
  },
  {
    id: "ai-automation",
    icon: Bot,
    title: "AI Automation",
    description: "Smarter workflows. Better efficiency. More growth.",
    row: 2,
  },
  {
    id: "performance-marketing",
    icon: BarChart3,
    title: "Performance Marketing",
    description: "Data-driven campaigns that deliver results.",
    row: 2,
  },
];
