/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green-dark': '#1C3A3A', // Dark green for sidebar and text
        'brand-green-light': '#D4F7A5', // Light green for active items
        'brand-background': '#F9F9F9', // Main background color
        'brand-surface': '#FFFFFF', // Card and Navbar background
        'brand-text-primary': '#1C3A3A',
        'brand-text-secondary': '#6B7280', // For subtitles
        'brand-yellow': '#FEF7C3',
        'brand-red': '#FEE2E2',
        'brand-border': '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
