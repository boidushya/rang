import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["Cabinet Grotesk", "sans-serif"],
        mono: ["var(--font-dm-mono)"],
      },
      keyframes: {
        overlayShow: {
          from: { opacity: `0` },
          to: { opacity: `1` },
        },
        overlayHide: {
          from: { opacity: `1` },
          to: { opacity: `0` },
        },
        contentShow: {
          from: {
            opacity: `0`,
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: `1`, transform: "translate(-50%, -50%) scale(1)" },
        },
        contentHide: {
          from: { opacity: `1`, transform: "translate(-50%, -50%) scale(1)" },
          to: { opacity: `0`, transform: "translate(-50%, -48%) scale(0.96)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        overlayHide: "overlayHide 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentHide: "contentHide 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "bounce-fast": "bounce 0.6s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
