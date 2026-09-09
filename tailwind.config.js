/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "rgb(var(--base) / <alpha-value>)",
          soft: "rgb(var(--base-soft) / <alpha-value>)",
        },
        panel: {
          DEFAULT: "rgb(var(--panel) / <alpha-value>)",
          raised: "rgb(var(--panel-raised) / <alpha-value>)",
          border: "rgb(var(--panel-border) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          muted: "rgb(var(--ink-muted) / <alpha-value>)",
          faint: "rgb(var(--ink-faint) / <alpha-value>)",
        },
        accent: {
          indigo: "rgb(var(--accent) / <alpha-value>)",
          violet: "rgb(var(--accent-soft) / <alpha-value>)",
          blue: "rgb(var(--accent) / <alpha-value>)",
          cyan: "rgb(var(--accent-cool) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["Manrope", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1240px",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgb(var(--accent) / 0.09), transparent 68%)",
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.6)",
        glow: "0 8px 24px -14px rgb(var(--accent) / 0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(14px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "count-fade": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 0.5 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-soft": "pulseSoft 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
