import type { Config } from "tailwindcss";

/**
 * LeadZing Design System v1.0 — Tailwind mapping.
 *
 * Color, spacing, radius and motion values are pulled directly from
 * the locked design tokens. `--color-primary` is sampled from the
 * approved hero mockup (rgb(22,233,245)) rather than the darker
 * #00C6C6 originally proposed in the design doc, since the mockup is
 * the more recent, art-directed reference.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#12E1F2",
          light: "#5FEEFA",
          dark: "#0BB8C7",
        },
        secondary: {
          DEFAULT: "#FF8C42",
        },
        ink: {
          DEFAULT: "#0A0B0C",
          700: "#1E1F21",
          500: "#6B6E76",
          300: "#B0B0B5",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F7F8FA",
          border: "#E7E9EC",
        },
        success: "#28A745",
        error: "#D93025",
        warning: "#FFB300",
        info: "#1570EF",
      },
      fontFamily: {
        display: ["var(--font-geist)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["4rem", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "h1-lg": ["6rem", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        display: ["6.5rem", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        h2: ["3.125rem", { lineHeight: "1.1" }],
        h3: ["2.375rem", { lineHeight: "1.2" }],
        h4: ["1.75rem", { lineHeight: "1.3" }],
        h5: ["1.5rem", { lineHeight: "1.35" }],
        h6: ["1.25rem", { lineHeight: "1.4" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.4" }],
      },
      spacing: {
        4.5: "1.125rem",
        18: "4.5rem",
        22: "5.5rem",
      },
      borderRadius: {
        base: "16px",
        cta: "24px",
      },
      boxShadow: {
        low: "0 1px 3px rgba(10,11,12,0.08)",
        medium: "0 4px 12px rgba(10,11,12,0.08)",
        high: "0 8px 32px rgba(10,11,12,0.12)",
        glass: "0 8px 30px rgba(10,11,12,0.06)",
      },
      transitionDuration: {
        fast: "200ms",
        medium: "300ms",
        slow: "500ms",
      },
      transitionTimingFunction: {
        "ease-out-premium": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-out-premium": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      maxWidth: {
        container: "75rem",
        "container-wide": "87.5rem", // 1400px — Invisible Problem centerpiece only
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
