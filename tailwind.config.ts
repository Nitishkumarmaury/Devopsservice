import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(77, 163, 255, 0.16), 0 24px 80px rgba(0, 0, 0, 0.34)",
      },
      colors: {
        rose: {
          50: "#ecf8fa",
          100: "#d8edf1",
          200: "#b7dde4",
          300: "#7fc8d3",
          400: "#37adbd",
          500: "#0f92a5",
          600: "#0e7889",
          700: "#0e6675",
          800: "#134f5b",
          900: "#123f4a",
        },
        violet: {
          50: "#eef4fb",
          100: "#dfe9f5",
          200: "#c4d8ec",
          300: "#9dbddb",
          400: "#6f99c4",
          500: "#4c78ad",
          600: "#315c94",
          700: "#294d7e",
          800: "#263f66",
          900: "#203452",
        },
        ink: {
          950: "#050713",
          900: "#090D1C",
          800: "#0D1326",
        },
        accent: {
          blue: "#4F8CFF",
          cyan: "#35D6ED",
          violet: "#8B6CFF",
          purple: "#B25CFF",
          emerald: "#35D49A",
          amber: "#FFBF69",
          rose: "#FF6F91",
        },
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at 15% 20%, rgba(79, 140, 255, 0.18), transparent 32%), radial-gradient(circle at 80% 15%, rgba(139, 108, 255, 0.16), transparent 30%), radial-gradient(circle at 65% 75%, rgba(53, 214, 237, 0.12), transparent 34%), linear-gradient(180deg, rgba(5, 7, 19, 0.98), rgba(9, 13, 28, 0.98))",
      },
      keyframes: {
        "border-beam": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(420%)" },
        },
        "border-beam-reverse": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-420%)" },
        },
      },
      animation: {
        "border-beam": "border-beam 4s linear infinite",
        "border-beam-reverse": "border-beam-reverse 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
