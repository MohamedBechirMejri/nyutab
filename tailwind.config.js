module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        borderFade: "borderFade .7s alternate infinite",
        fadeIn: "fadeIn .5s forwards",
      },
      keyframes: {
        borderFade: {
          "0%": {
            borderColor: "currentColor",
          },
          "100%": {
            borderColor: "transparent",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
