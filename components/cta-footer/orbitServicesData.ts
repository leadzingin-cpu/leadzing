import type { LucideIcon } from "lucide-react";
import {
  Zap,
  Camera,
  BarChart3,
  Megaphone,
  Rocket,
  MonitorSmartphone,
  PenTool,
  Users,
} from "lucide-react";

export interface OrbitCardData {
  id: string;
  icon: LucideIcon;
  title: string;
  /** Which side of the mascot this card floats on. */
  side: "left" | "right";
  /** Vertical position within its side, 0-100 (top to bottom). */
  y: number;
  delay: number;
}

/**
 * Eight service cards split evenly across two sides, ordered
 * top-to-bottom per side to match the reference's reading order.
 */
export const ORBIT_CARDS: OrbitCardData[] = [
  { id: "brand-strategy", icon: Zap, title: "Brand Strategy", side: "left", y: 6, delay: 0 },
  { id: "content-production", icon: Camera, title: "Content Production", side: "left", y: 30, delay: 0.08 },
  { id: "analytics", icon: BarChart3, title: "Analytics", side: "left", y: 56, delay: 0.16 },
  { id: "social-media", icon: Megaphone, title: "Social Media", side: "left", y: 80, delay: 0.24 },
  { id: "growth", icon: Rocket, title: "Growth", side: "right", y: 6, delay: 0.04 },
  { id: "web-development", icon: MonitorSmartphone, title: "Web Development", side: "right", y: 30, delay: 0.12 },
  { id: "creative-direction", icon: PenTool, title: "Creative Direction", side: "right", y: 56, delay: 0.2 },
  { id: "brand-identity", icon: Users, title: "Brand Identity", side: "right", y: 80, delay: 0.28 },
];
