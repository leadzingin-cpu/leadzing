import type { LucideIcon } from "lucide-react";
import { Search, Target, PenTool, Rocket, LineChart, TrendingUp } from "lucide-react";

export interface ProcessStepData {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStepData[] = [
  {
    id: "discover",
    icon: Search,
    title: "Discover",
    description: "We understand your brand, audience and market.",
  },
  {
    id: "strategize",
    icon: Target,
    title: "Strategize",
    description: "We craft a winning strategy tailored to your goals.",
  },
  {
    id: "create",
    icon: PenTool,
    title: "Create",
    description: "We produce content, designs and assets that connect.",
  },
  {
    id: "launch",
    icon: Rocket,
    title: "Launch",
    description: "We launch across the right channels with precision.",
  },
  {
    id: "optimize",
    icon: LineChart,
    title: "Optimize",
    description: "We analyze, test and optimize for maximum performance.",
  },
  {
    id: "scale",
    icon: TrendingUp,
    title: "Scale",
    description: "We scale what works and grow your brand to the next level.",
  },
];
