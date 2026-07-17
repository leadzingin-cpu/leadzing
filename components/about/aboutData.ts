import type { LucideIcon } from "lucide-react";
import { Users, Zap, Star, Target, Sparkles, Handshake, Rocket } from "lucide-react";

export interface InfoCardData {
  id: string;
  icon: LucideIcon;
  heading: string;
  subheading: string;
}

export const LEFT_INFO_CARDS: InfoCardData[] = [
  { id: "reach", icon: Users, heading: "100+", subheading: "Businesses Reached" },
  { id: "services", icon: Zap, heading: "5 Services", subheading: "One Complete Growth System" },
  { id: "craft", icon: Star, heading: "Strategy \u2022 Content \u2022 Web", subheading: "Built Together" },
];

export interface CoreValueData {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const CORE_VALUES: CoreValueData[] = [
  { id: "strategy-first", icon: Target, title: "Strategy First", description: "Every decision has purpose." },
  { id: "quality", icon: Sparkles, title: "Quality over Quantity", description: "Better work beats more work." },
  { id: "partnership", icon: Handshake, title: "Long-Term Partnership", description: "We grow together." },
  { id: "innovation", icon: Rocket, title: "Constant Innovation", description: "Always improving." },
];
