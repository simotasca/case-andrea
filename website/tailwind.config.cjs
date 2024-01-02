const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Lexend Deca', sans-serif",
        mont: "'Montserrat', sans-serif",
        serif: "'Merriweather', serif",
      },
      aspectRatio: {
        image: "4 / 3",
      },
      colors: {
        airbnb: "#ff385c",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ theme, addBase, addComponents, addVariant }) => {
      addBase({
        "::selection": {
          color: theme("colors.white"),
          background: theme("colors.airbnb"),
        },
      });
      addComponents({
        ".stack": {
          display: "grid",
          "& > *": {
            gridColumn: "1 / -1",
            gridRow: "1 / -1",
          },
        },
        ".full-bleed": {
          width: "calc(100vw + 2px)",
          position: "relative",
          left: "50%",
          transform: "translateX(calc(-50vw - 1px))",
        },
      });
      addVariant("children", "& > *");
    }),
  ],
};
