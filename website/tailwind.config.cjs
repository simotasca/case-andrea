const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Lexend Deca', sans-serif",
        mont: "'Montserrat', sans-serif",
        serif: "'Merriweather', serif",
      },
      aspectRatio: {
        'image': '4 / 3',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ theme, addBase, addComponents, addVariant, addUtilities }) => {
      addBase({
        "::selection": {
          color: theme("colors.dark"),
          background: theme("colors.yellow"),
        },
        "body": {
          color: theme("colors.dark"),
        }
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
          transform: "translateX(calc(-50vw - 1px))"
        }
      });
      addVariant('children', '& > *');
    }),
  ],
};
