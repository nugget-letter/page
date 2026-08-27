import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#FF6B35",
        yellow: "#FFB800",
        peach: "#FFF3EC",
        peach2: "#FFE4D4",
        dark: "#1C1C1C",
        mid: "#555555",
        gray: "#999999",
        line: "#EBEBEB",
        light: "#FAF9F7",
      },
      backgroundImage: {
        grad: "linear-gradient(135deg, #FFB800 0%, #FF6B35 100%)",
        "grad-motion": "linear-gradient(120deg, #ffffff 40%, #FFF3EC 60%, #ffffff 80%)",
      },
      fontFamily: {
        gmarket: ["var(--font-gmarket)", "sans-serif"],
        noto: ["var(--font-noto)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
