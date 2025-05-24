/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#FFCDD2",
          200: "#EF9A9A",
          300: "#E57373",
          400: "#EF5350",
          500: "#E50914",
          600: "#D40813",
          700: "#B00610",
        },
        secondary: {
          100: "#2E2E2E",
          200: "#1F1F1F",
          300: "#141414",
          400: "#0E0E0E",
        },
        tertiary: {
          100: "#D3D3D3",
          200: "#A9A9A9",
          300: "#696969",
          400: "#2F2F2F",
        },
        accent: {
          100: "#FFFFFF",
          200: "#F5F5F5",
          300: "#DDDDDD",
        },
        muted: {
          100: "#D6D6D6",
          200: "#B3B3B3",
          300: "#999999",
        },
        overlay: {
          100: "rgba(0,0,0,0.25)",
          200: "rgba(0,0,0,0.4)",
          300: "rgba(0,0,0,0.6)",
        },
      },
    },
  },
  plugins: [],
};
