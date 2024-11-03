/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["Consolas", "Monaco", "monospace"],
      },
      colors: {},
      screens: {
        "3xl": "1921px",
      },
      padding: {
        large: "calc((100vw - 1600px) / 2)",
      },
      margin: {
        large: "calc((100vw - 1600px) / 2)",
      },
    },
  },
  plugins: [],
};
