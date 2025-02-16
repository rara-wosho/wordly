/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaryBackground: "#f8f4ff",
        primary: {
          1: "#2D336B",
          2: "#7886C7",
          3: "#A9B5DF",
        },
        secondary: {
          DEFAULT: "#e6d0ff",
          50: "#f9f4ff",
          100: "#f3eaff",
          200: "#e6d0ff",
          300: "#d3aaff",
          400: "#b27bff",
          500: "#8c4eff",
          600: "#6c3dcc",
          700: "#523199",
          800: "#3b2373",
          900: "#27184d",
        },
        accent: "#FFF2F2",
      },
    },
  },
  plugins: [],
};
