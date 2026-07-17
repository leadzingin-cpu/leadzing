"use client";

import { motion } from "framer-motion";
import { CAPABILITIES } from "./capabilitiesData";
import { WIDGETS } from "./widgetsData";
import { CapabilityCard } from "./CapabilityCard";
import { FloatingWidget } from "./FloatingWidget";
import { EcosystemHub } from "./EcosystemHub";
import {
  capabilityGridVariants,
  widgetStackVariants,
  capabilityConnectorTransition,
} from "@/animations/capabilitiesAnimations";

/** One connector line per capability row, converging on the hub at the diagram's center. */
const ROW_Y = [16, 50, 84];
const HUB = { x: 50, y: 50 };

/**
 * The three-part stage below the Capabilities headline: capability
 * cards on the left (with animated connector lines feeding into the
 * hub), the LeadZing/Zingy hub in the middle, and floating proof
 * widgets on the right. Connector lines are schematic rather than
 * pixel-precise — same decorative approach as the Solution section's
 * <HubSpokeDiagram> — and are hidden below `lg` where the three
 * columns stack and a literal connection reads as visual noise.
 */
export function EcosystemDiagram() {
  return (
    <div className="relative mt-20 lg:mt-28">
      {/* Connector lines — desktop only, purely decorative */}
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {ROW_Y.map((y, i) => (
          <motion.line
            key={y}
            x1={4}
            y1={y}
            x2={HUB.x}
            y2={HUB.y}
            stroke="var(--color-primary)"
            strokeOpacity={0.3}
            strokeWidth={0.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={capabilityConnectorTransition(i)}
          />
        ))}
      </svg>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.85fr_1fr] lg:gap-6">
        {/* Left — capability cards */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={capabilityGridVariants}
          className="relative z-10 grid grid-cols-2 gap-4 sm:gap-5"
        >
          {CAPABILITIES.map((capability) => (
            <li key={capability.id}>
              <CapabilityCard capability={capability} />
            </li>
          ))}
        </motion.ul>

        {/* Center — the connected hub */}
        <EcosystemHub />

        {/* Right — floating proof widgets */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={widgetStackVariants}
          className="relative z-10 mx-auto flex w-full max-w-[280px] flex-col gap-4 sm:max-w-[320px] sm:gap-5"
        >
          {WIDGETS.map((widget) => (
            <FloatingWidget key={widget.id} widget={widget} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
