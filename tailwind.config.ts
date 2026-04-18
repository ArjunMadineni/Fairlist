import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      colors: {
        bg: {
          base: "#0a0a0f",
          surface: "#111118",
          elevated: "#18181f",
          border: "#26262e",
        },
        accent: {
          DEFAULT: "#7c6dfa",
          hover: "#9485fb",
          muted: "#7c6dfa22",
        },
        status: {
          pending: "#f59e0b",
          in_progress: "#3b82f6",
          completed: "#10b981",
        },
        priority: {
          low: "#6b7280",
          medium: "#f59e0b",
          high: "#ef4444",
        },
      },
    },
  },
  plugins: [],
};
export default config;
