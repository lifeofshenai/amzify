// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideFadeIn: {
          "0%": { opacity: 0, transform: "translateX(-100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        bounceIn: {
          "0%": {
            transform: "translateX(-100%) scale(0.8)",
            opacity: 0,
          },
          "60%": {
            transform: "translateX(10px) scale(1.05)",
            opacity: 1,
          },
          "100%": {
            transform: "translateX(0) scale(1)",
          },
        },
        scaleIn: {
          "0%": { opacity: 0, transform: "scale(0.8)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        underline: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        slideFadeIn: "slideFadeIn 0.5s ease-out",
        bounceIn: "bounceIn 0.5s ease-out",
        scaleIn: "scaleIn 0.5s ease-out",
        underline: "underline 0.3s ease-out forwards",
      },
    },
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
},
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};


