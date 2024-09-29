/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#ffcce1",
          200: "#ff99c4",
          300: "#ff66a6",
          400: "#ff3389",
          500: "#ff006b",
          600: "#cc0056",
          700: "#990040",
          800: "#66002b",
          900: "#330015"
        },
  },
}},
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};


