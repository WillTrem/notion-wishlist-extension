/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        main: {
          light: "#2C2C2C",
          DEFAULT: "#202020",
          dark: "#191919",
          text: "D4D4D4",
        },
      },
    },
  },
  plugins: [],
};
