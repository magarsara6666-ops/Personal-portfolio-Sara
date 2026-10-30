import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        wine: "#258F5B",
        merlot: "#174D35",
        blush: "#DDF7E8",
        rosewater: "#F5FFF9",
        ink: "#183328",
        leaf: "#54B978",
        mint: "#EAF9F0",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(23, 77, 53, 0.14)",
      },
      fontFamily: {
        sans: ["Avenir Next", "Avenir", "Segoe UI", "sans-serif"],
        serif: ["Iowan Old Style", "Baskerville", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
