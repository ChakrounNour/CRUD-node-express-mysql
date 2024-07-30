/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D9EDBF",
        secondary: "#FF9800",
        red: "#FF0000",
        Beige: "#FFE8C5",
        gris200: "#F3F3F3",
        grisLight: "#eaeaea",
        blueLight: "#e9f3fd",
        blue500: "#317fc9",
        blueDark: "#198cf7",
        blueGris: "#434551",
        pinkLight: "#fdefe4",
        textDark: "#1c1c1c",
        success: "#3bb373",
        noir: "#000",
      },
    },
  },
  plugins: [],
};
