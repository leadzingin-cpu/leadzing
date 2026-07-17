export type WidgetVisual =
  | "social"
  | "ads"
  | "website"
  | "seo"
  | "workflow"
  | "email";

export interface WidgetData {
  id: string;
  visual: WidgetVisual;
  label: string;
  /** Slight alternating horizontal offset so the stack reads as loosely floating rather than a rigid list. */
  align: "start" | "end";
  /** Stagger delay, in seconds. */
  delay: number;
}

/**
 * Proof-point widgets — real outcomes framed as live product UI,
 * echoing the Hero's holographic panels but reserved for this
 * section so the two don't compete. Purely decorative/illustrative;
 * figures are representative rounding, not a claim tied to any
 * specific client.
 */
export const WIDGETS: WidgetData[] = [
  { id: "social", visual: "social", label: "Social Analytics", align: "end", delay: 0 },
  { id: "ads", visual: "ads", label: "Ad Performance", align: "start", delay: 0.08 },
  { id: "website", visual: "website", label: "Website Wireframe", align: "end", delay: 0.16 },
  { id: "seo", visual: "seo", label: "SEO Rankings", align: "start", delay: 0.24 },
  { id: "workflow", visual: "workflow", label: "AI Workflow", align: "end", delay: 0.32 },
  { id: "email", visual: "email", label: "Email Campaign", align: "start", delay: 0.4 },
];
