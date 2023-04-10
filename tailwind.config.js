const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      white: "#f2f2f2",
      black: "#222222",
    },
  },
  plugins: [],
};
