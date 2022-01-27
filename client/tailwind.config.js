module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.{vue,ts}"],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
