/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        'light-primary': '#4B0082', // Indigo
        'light-secondary': '#FFD700', // Gold
        'light-background': '#F8F9FA', // Soft White
        'light-text': '#2C2C2C', // Dark Charcoal
        'light-accent': '#0056B3', // Royal Blue
        
        // Dark mode colors
        'dark-primary': '#9370DB', // Medium Purple
        'dark-secondary': '#FFD700', // Gold
        'dark-background': '#121212', // Deep Black
        'dark-text': '#EAEAEA', // Soft White
        'dark-accent': '#1E90FF', // Bright Blue
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
}
