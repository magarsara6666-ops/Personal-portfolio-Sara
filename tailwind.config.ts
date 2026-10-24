import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        wine: "#701F3A",
        merlot: "#531328",
        blush: "#F7E5E8",
        rosewater: "#FCF5F4",
        ink: "#231A1D",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(83, 19, 40, 0.12)",
      },
      fontFamily: {
        sans: ["Avenir Next", "Avenir", "Segoe UI", "sans-serif"],
        serif: ["Iowan Old Style", "Baskerville", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
