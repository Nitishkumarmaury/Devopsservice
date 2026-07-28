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
          50: "#0d2338",
          100: "#102b45",
          200: "#17466f",
          300: "#3b82f6",
          400: "#60a5fa",
          500: "#4da3ff",
          600: "#7dbaff",
          700: "#b9ddff",
          800: "#d7ebff",
          900: "#eef7ff",
        },
        violet: {
          50: "#151322",
          100: "#211d35",
          200: "#332c55",
          300: "#594b8d",
          400: "#7f6bd0",
          500: "#a592ff",
          600: "#b8a5ff",
          700: "#c9bcff",
          800: "#ddd5ff",
          900: "#f1eeff",
        },
        ink: {
          950: "#030a16",
          900: "#06111f",
          800: "#081a2e",
        },
        accent: {
          blue: "#7DD3FC",
          cyan: "#4DA3FF",
          violet: "#B8A5FF",
          purple: "#B8A5FF",
          emerald: "#4DA3FF",
          amber: "#FFCF72",
          rose: "#FF8A7A",
        },
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at 15% 20%, rgba(77, 163, 255, 0.14), transparent 32%), radial-gradient(circle at 80% 15%, rgba(125, 211, 252, 0.1), transparent 30%), radial-gradient(circle at 65% 75%, rgba(255, 138, 122, 0.08), transparent 34%), linear-gradient(180deg, rgba(6, 17, 31, 0.98), rgba(8, 26, 46, 0.98))",
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
