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
        blue: {
          100: '#a0b2d9', // Blue claro
          200: '#7f8ab4', // Blue moderado
          300: '#5e6a90', // Blue más oscuro
          400: '#4a577c', // Blue oscuro claro
          500: '#38436c', // Azul oscuro (profundo)
          600: '#303c5c', // Azul más profundo
          700: '#283346', // Azul muy profundo
          800: '#1f2a30', // Azul casi negro
        },
        orange: {
          400: '#f47f5e',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
