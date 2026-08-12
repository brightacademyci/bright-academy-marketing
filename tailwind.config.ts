import type { Config } from "tailwindcss";

// Brand tokens matched to the Bright Academy OS app's own navy rebrand
// (2026-08-03) so the marketing site and the app feel like one brand —
// #113e6f is the exact navy sampled from the real crest (public/logo.png).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#113e6f",
          dark: "#0a2340",
          deep: "#071426",
          light: "#6d93c7",
        },
        orange: {
          DEFAULT: "#f2790c",
          // Darker variant for small text set on light backgrounds — the
          // brand orange (#f2790c) is only ~2.6:1 against the page's #f7f8fa
          // background, well under the 4.5:1 WCAG AA minimum for body-sized
          // text. This hits ~4.7:1 while staying clearly "the brand orange."
          // Keep using the DEFAULT for orange-on-dark contexts (it's ~6.6:1
          // against navy-deep) and for decorative fills/icons/large text.
          text: "#b55300",
        },
        bg: "#f7f8fa",
      },
      fontFamily: {
        // Self-hosted via @fontsource (see globals.css) rather than
        // next/font/google, so the build never depends on reaching Google
        // Fonts — it just works, offline included.
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        kenburns: "kenburns 12s ease-out forwards",
        fadeInUp: "fadeInUp 0.7s ease-out forwards",
        float: "float 2.4s ease-in-out infinite",
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
