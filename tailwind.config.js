/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        recommended: "1920px",
      },
      height: {
        recommended: "1200px",
      },
      colors: {
        white: "#f2f2f2",
        black: "#222222",
      },
    },
  },
  plugins: [],
};
