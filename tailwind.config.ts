/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    fontSize: {
      xxs: "11px",
      xs: "13px",
      sm: "14px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        sm: "420px",
        xs: "320px",
      },
    },
    extend: {
      colors: {
        "primary-100": "#81a1c1",
        "primary-200": "#8fabc8",
        "primary-300": "#9db5cf",
        "primary-400": "#abbfd5",
        "primary-500": "#b9cadc",
        "primary-600": "#c7d4e3",
        "primary-700": "#eceff4",

        "dark-100": "#141414",
        "dark-200": "#292929",
        "dark-300": "#404040",
        "dark-400": "#585858",
        "dark-500": "#727272",
        "dark-600": "#8c8c8c",

        "surface-mixed-100": "#1e2023",
        "surface-mixed-200": "#333538",
        "surface-mixed-300": "#494b4d",
        "surface-mixed-400": "#606264",
        "surface-mixed-500": "#797a7c",
        "surface-mixed-600": "#929395",

        midnight: "#090911",
        highlight: "#3291ff",
        grapefruit: "#DA4453",
        amaranth: "#E52B50",

        "warm-gray": "#cfc6c1",
        gray: {
          10: "#EEEEEE",
          20: "#A3A3A3",
          30: "#7B7B7B",
          50: "#585858",
          70: "#222020",
          90: "#141414",
          200: "#121214",
        },
      },
      fontFamily: {
        allerta: ["Allerta Stencil", "sans-serif"],
        assistant: ["Assistant", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
