import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#062016",
        swiss: {
          white: "#FFFFFF",
          canvas: "#F8FAF9",
          surface: "#F1F5F3",
          border: "#E2E8F0",
          pine: "#062016",
          pineMid: "#0B3324",
        },
        brand: {
          emerald: "#059669",
          emeraldBright: "#10B981",
          emeraldLight: "#D1FAE5",
          emeraldSoft: "#ECFDF5",
          pine: "#064E3B",
          slate: "#0F172A",
          muted: "#475569",
          crimson: "#DC2626",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        swiss: "0 1px 3px 0 rgba(6, 32, 22, 0.05), 0 1px 2px -1px rgba(6, 32, 22, 0.03)",
        "swiss-md": "0 10px 30px -10px rgba(6, 32, 22, 0.08), 0 4px 12px -4px rgba(5, 150, 105, 0.06)",
        "swiss-lg": "0 20px 50px -12px rgba(6, 32, 22, 0.12), 0 8px 24px -6px rgba(5, 150, 105, 0.08)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
