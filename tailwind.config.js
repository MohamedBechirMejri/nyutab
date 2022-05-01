module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        borderFade: "borderFade .7s alternate infinite",
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
      },
    },
  },
  plugins: [],
};
