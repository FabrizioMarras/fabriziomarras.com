/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        'title': ['Montserrat', 'sans-serif'],
        'body': ['"Open Sans"', 'sans-serif'] // Ensure fonts with spaces have " " surrounding it.
      },
      colors: {
        primary: "#6f42c1", // Purple 
        secondary: "#217ec4", //light blue
        tertiary: "#46739a", // opaque blue
        red: '#ec1d24', // Red
        orange: '#f6921f', // Orange
        water: '#2dc4b6' // Water
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};

