/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canvas app theme colors
        'app-background': 'var(--app-background)', // Dark blue
        'app-card': 'var(--app-card)', // Slate dark
        'app-card-hover': 'var(--app-card-hover)', // Lighter slate
        'app-border': 'var(--app-border)', // Border color
        'app-text-primary': 'var(--app-text-primary)', // White text
        'app-text-secondary': 'var(--app-text-secondary)', // Gray text
        'app-accent-purple': 'var(--app-accent-purple)', // Purple accent
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      boxShadow: {
        'canvas-card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
