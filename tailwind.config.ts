import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",   // 👈 THIS LINE IS CRITICAL
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0EA5E9",
          dark:    "#0284C7",
          light:   "#38BDF8",
        },
      },
    },
  },
  plugins: [],
};
export default config;