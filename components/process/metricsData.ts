import type { LucideIcon } from "lucide-react";
import { TrendingUp, Target, MousePointerClick } from "lucide-react";

export interface MetricData {
  id: string;
  icon: LucideIcon;
  label: string;
  value: string;
  sublabel?: string;
  /** Position within the showcase stage, as Tailwind position classes. */
  position: string;
  delay: number;
}

/**
 * Representative proof metrics floating around the dashboard mockup.
 * Illustrative figures, not tied to a specific client engagement.
 */
export const METRICS: MetricData[] = [
  {
    id: "client-growth",
    icon: TrendingUp,
    label: "Client Growth",
    value: "+218%",
    position: "-top-6 -right-4 sm:-right-8",
    delay: 0,
  },
  {
    id: "campaign-performance",
    icon: Target,
    label: "Campaign Performance",
    value: "98%",
    sublabel: "Success Rate",
    position: "top-[46%] -right-8 sm:-right-14",
    delay: 0.15,
  },
  {
    id: "website-conversion",
    icon: MousePointerClick,
    label: "Website Conversion",
    value: "+164%",
    position: "-bottom-8 -right-2 sm:-right-6",
    delay: 0.3,
  },
];
