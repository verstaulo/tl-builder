/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      colors: {
        neutral7: "hsla(195, 9%, 9%, 1)",
        neutral6: "hsla(195, 5%, 15%, 1)",
        neutral5: "hsla(195, 5%, 22%, 1)",
        neutral4: "hsla(200, 4%, 44%, 1)",
        neutral3: "hsla(204, 18%, 92%, 1)",
        neutral2: "hsla(204, 15%, 96%, 1)",
        neutral1: "hsla(0, 0%, 100%, 1)",
        primary: "hsla(209, 100%, 50%, 1)",
        secondary: "hsla(142, 70%, 56%, 1)",
        legendary: "hsla(18, 86%, 45%, 1)",
        epic: "hsla(263, 78%, 63%, 1)",
        epic2: "hsla(263, 78%, 63%, 1)",
        rare: "hsla(209, 100%, 50%, 1)",
        uncommon: "hsla(142, 70%, 56%, 1)",
        common: "hsla(200, 4%, 44%, 1)",
      },
      backgroundImage: {
        legendary_gradient:
        "linear-gradient(to right,hsla(11, 23%, 36%, 0.5),hsla(11, 5%, 21%, 1))",
        epic_gradient:
        "linear-gradient(to right,hsla(245, 23%, 46%, 0.5),hsla(259, 13%, 20%, 0.8))",
        rare_gradient: "linear-gradient(to right,hsla(228, 23%, 36%, 0.5),hsla(228, 5%, 21%, 1))",
        uncommon_gradient:
        "linear-gradient(to right,hsla(176, 23%, 36%, 0.5),hsla(151, 5%, 21%, 0.96))",
        common_gradient:
        "linear-gradient(to right,hsla(0, 0%, 26%, 0.29),hsla(0, 0%, 46%, 0.29),hsla(0, 0%, 22%, 1))",
      },
      dropShadow: {
        primary: " 0 0 10px hsla(209, 100%, 50%, 1)",
        secondary: " 0 0 10px hsla(142, 70%, 56%, 1)",
        legendary: "0 0 10px hsla(18, 86%, 45%, 1)",
        epic: "0 0 10px hsla(263, 78%, 63%, 1)",
        epic2: "0 0 10px hsla(263, 78%, 63%, 1)",
        rare: "0 0 10px hsla(209, 100%, 50%, 1)",
        common: "0 0 10px hsla(200, 4%, 44%, 1)",
        uncommon: "0 0 10px hsla(142, 70%, 56%, 1)",
      },
      fontFamily: {
        Teco: ["Teko", "sans-serif"],
      },
    },
  },
  plugins: [],
};
