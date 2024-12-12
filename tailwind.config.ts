import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        coral: {
          400: '#f4a286',
        },
        peach: {
          300: '#f5c5ae',
        },
        sand: {
          100: '#f6e9d7',
        },
        orange: {
          400: '#f47f5e',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
