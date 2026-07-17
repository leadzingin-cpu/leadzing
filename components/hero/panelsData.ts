import type { LucideIcon } from "lucide-react";
import { LineChart, Palette, Layout, BarChart3, Lightbulb } from "lucide-react";

export interface FloatingPanelData {
  id: string;
  icon: LucideIcon;
  label: string;
  /** Position expressed as percentage offsets from the showcase container */
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  /** Relative depth for parallax — higher drifts further with the cursor */
  depth: number;
  /** Stagger delay for the entrance animation, in seconds */
  delay: number;
  size: "sm" | "md";
}

export const FLOATING_PANELS: FloatingPanelData[] = [
  {
    id: "analytics",
    icon: LineChart,
    label: "Analytics Overview",
    position: { top: "6%", left: "-6%" },
    depth: 0.6,
    delay: 0.1,
    size: "md",
  },
  {
    id: "website",
    icon: Layout,
    label: "Website Redesign",
    position: { top: "2%", right: "-8%" },
    depth: 0.8,
    delay: 0.2,
    size: "md",
  },
  {
    id: "content",
    icon: Palette,
    label: "Content Calendar",
    position: { bottom: "22%", left: "-10%" },
    depth: 0.5,
    delay: 0.3,
    size: "sm",
  },
  {
    id: "brand",
    icon: Lightbulb,
    label: "Brand Identity",
    position: { top: "42%", right: "-12%" },
    depth: 0.7,
    delay: 0.4,
    size: "sm",
  },
  {
    id: "performance",
    icon: BarChart3,
    label: "Campaign Performance",
    position: { bottom: "4%", right: "-4%" },
    depth: 0.9,
    delay: 0.5,
    size: "md",
  },
];
