/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#1C1C1C",
        brandBlue: "#0000AA",
        gold: "#C9A227",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
        display: ["'Outfit'", "'Syne'", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.15em",
        wider: "0.08em",
      },
    },
  },
  plugins: [],
}
