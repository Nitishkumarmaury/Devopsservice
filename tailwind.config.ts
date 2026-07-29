import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    // ── All colors live here. Edit this block to re-theme the entire site ──
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",

      // Primary accent (used for active states, borders, focus rings)
      brand: {
        DEFAULT: "#0ea5b7",
        dark: "#0e6675",
        soft: "#d8edf1",
      },

      // Scroll-reveal target + active nav indicator
      secondary: {
        DEFAULT: "#315c94",
        soft: "#dfe9f5",
      },

      // Page backgrounds and surface fills
      canvas: {
        DEFAULT: "#f5f5f0",
        soft: "#eeede8",
        surface: "#ffffff",
      },

      // Text and structural dark tones
      ink: {
        DEFAULT: "#14212f",
        secondary: "#526173",
        muted: "#888888",
        navy: "#0f1f2f",
      },

      // Borders
      border: {
        DEFAULT: "rgba(15, 34, 48, 0.16)",
        strong: "rgba(15, 34, 48, 0.28)",
        active: "#0ea5b7",
      },

      // State colors
      success: "#1f8a68",
      warning: "#d5a645",
      danger: "#bc5a5a",
    },

    // ── Typography ──
    fontFamily: {
      mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      sans: ["var(--font-inter)", "system-ui", "sans-serif"],
    },

    // ── Zero border-radius (sharp rectangles) ──
    borderRadius: {
      none: "0px",
      sm: "2px",
      DEFAULT: "2px",
    },

    // ── No shadows — borders define depth ──
    boxShadow: {
      none: "none",
    },

    extend: {
      // Scroll-driven char reveal animation
      keyframes: {
        "char-in": {
          from: { color: "var(--color-ink-muted)" },
          to: { color: "var(--color-secondary)" },
        },
        "page-enter": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "char-in": "char-in linear both",
        "page-enter": "page-enter 200ms ease both",
        marquee: "marquee 34s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
