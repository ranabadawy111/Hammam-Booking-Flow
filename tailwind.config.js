/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F3ECE1",
        ink: "#241E1A",
        plum: {
          50: "#F4EDF1",
          100: "#E2D0DA",
          400: "#6B4A63",
          600: "#4A3350",
          700: "#3A2840",
          800: "#2E1F2B",
          900: "#20161F",
        },
        rose: {
          300: "#DDB0B6",
          400: "#CF98A0",
          500: "#C07E88",
          600: "#A2606B",
        },
        brass: {
          400: "#C6A467",
          500: "#B08D4F",
          600: "#8E703C",
        },
      },
      fontFamily: {
        display: ["Newsreader", "serif"],
        sans: ["Work Sans", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 2px 16px rgba(46, 31, 43, 0.08)",
        card: "0 1px 2px rgba(46,31,43,0.05), 0 12px 32px -12px rgba(46,31,43,0.18)",
      },
      borderRadius: {
        arch: "999px 999px 0 0",
      },
    },
  },
  plugins: [],
}
