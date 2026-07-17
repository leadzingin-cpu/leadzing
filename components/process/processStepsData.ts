import type { LucideIcon } from "lucide-react";
import { Search, TrendingUp, Clapperboard, Rocket, BarChart3 } from "lucide-react";

export interface ProcessStepData {
  id: string;
  number: string;
  icon: LucideIcon;
  title: string;
  /** Short paragraphs, rendered as separate blocks — matches the reference's paragraph breaks. */
  paragraphs: string[];
  /**
   * Vertical offset applied at the `lg` breakpoint only, in pixels —
   * produces the gentle zigzag rhythm from the reference layout.
   * Kept as data (not hardcoded per-card classes) so the stagger
   * order and the visual rhythm stay in one place.
   */
  offsetY: number;
}

export const PROCESS_STEPS: ProcessStepData[] = [
  {
    id: "discovery",
    number: "01",
    icon: Search,
    title: "Discovery",
    paragraphs: [
      "Every successful brand begins with understanding, not assumptions.",
      "We take the time to learn about your business, audience, competitors, and long-term vision before making a single creative decision.",
      "This foundation allows everything that follows to have purpose.",
    ],
    offsetY: 0,
  },
  {
    id: "strategy",
    number: "02",
    icon: TrendingUp,
    title: "Strategy",
    paragraphs: [
      "Ideas without direction rarely create lasting brands.",
      "Using everything we've learned, we develop a tailored roadmap covering positioning, messaging, branding, content, and growth.",
      "Every decision is intentional.",
    ],
    offsetY: 40,
  },
  {
    id: "creation",
    number: "03",
    icon: Clapperboard,
    title: "Creation",
    paragraphs: [
      "This is where strategy becomes reality.",
      "Our team creates premium visuals, compelling content, beautiful websites, and memorable brand experiences designed to work together as one complete system.",
      "Nothing is created without purpose.",
    ],
    offsetY: 14,
  },
  {
    id: "launch",
    number: "04",
    icon: Rocket,
    title: "Launch",
    paragraphs: [
      "Execution matters just as much as creation.",
      "We carefully launch every campaign, website, and content piece across the right platforms to maximize visibility from day one.",
      "Every detail is optimized before going live.",
    ],
    offsetY: 54,
  },
  {
    id: "growth",
    number: "05",
    icon: BarChart3,
    title: "Growth",
    paragraphs: [
      "Building your brand doesn't stop after launch.",
      "We continuously analyze performance, refine strategy, improve campaigns, and identify new opportunities to ensure sustainable long-term growth.",
      "Because great brands are never finished.",
    ],
    offsetY: 28,
  },
];
