import type { Config } from "tailwindcss";

// Every color is a CSS variable defined in app/globals.css so the light and
// dark palettes swap without dark: variants sprinkled through the components.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"]
      },
      maxWidth: {
        page: "66rem"
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        rise: "rise 0.5s ease-out both"
      }
    }
  },
  plugins: []
};
export default config;
