/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#eff3fe",
          100: "#e1ebfe",
          200: "#c9d8fc",
          300: "#a8bef9",
          400: "#859af4",
          500: "#6878ec",
          600: "#4349de",
          700: "#3d40c5",
          800: "#34389f",
          900: "#31357e",
          950: "#1d1f49",
        },
      },
    },
  },
  plugins: [],
};
