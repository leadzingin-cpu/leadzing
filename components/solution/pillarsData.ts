import type { LucideIcon } from "lucide-react";
import { Compass, Film, LayoutTemplate, Crown, TrendingUp } from "lucide-react";

export interface PillarData {
  id: string;
  icon: LucideIcon;
  label: string;
  /**
   * Position in a 0–100 coordinate space — doubles as both the
   * percentage placement for the card and the SVG viewBox unit for
   * its connector line, so the two never drift out of sync.
   */
  x: number;
  y: number;
}

/**
 * Five pillars arranged in a pentagon around the central hub,
 * ordered clockwise from the top so the stagger animation reads as a
 * single deliberate sweep rather than a scatter.
 */
export const PILLARS: PillarData[] = [
  { id: "strategy", icon: Compass, label: "Strategy", x: 50, y: 8 },
  { id: "websites", icon: LayoutTemplate, label: "Websites", x: 90, y: 37 },
  { id: "growth", icon: TrendingUp, label: "Growth", x: 75, y: 85 },
  { id: "branding", icon: Crown, label: "Branding", x: 25, y: 85 },
  { id: "content", icon: Film, label: "Content", x: 10, y: 37 },
];
