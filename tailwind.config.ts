import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "blob-float": "blob-float 6s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        "blob-float-centered": "blob-float-centered 9s cubic-bezier(0.65, 0, 0.35, 1) infinite",
      },
      keyframes: {
        "blob-float": {
          "0%": { transform: "translate3d(0px, 0px, 0) scale(1)" },
          "33%": { transform: "translate3d(30px, -40px, 0) scale(1.08)" },
          "66%": { transform: "translate3d(-25px, 20px, 0) scale(0.95)" },
          "100%": { transform: "translate3d(0px, 0px, 0) scale(1)" },
        },
        "blob-float-centered": {
          "0%, 100%": { transform: "translate3d(-50%, -25%, 0) scale(1)" },
          "25%": { transform: "translate3d(-70%, 0%, 0) scale(1.08)" },
          "50%": { transform: "translate3d(-40%, 25%, 0) scale(0.95)" },
          "75%": { transform: "translate3d(-60%, 10%, 0) scale(1.04)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;