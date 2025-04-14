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
        // Canvas app colors (dark mode based on images)
        'app-background': '#0f0f18',
        'app-card': '#1c1c27',
        'app-card-hover': '#252532',
        'app-accent-purple': '#6f42c1',
        'app-accent-green': '#0dc373',
        'app-text-primary': '#ffffff',
        'app-text-secondary': '#9b9ba7',
        'app-border': '#2a2a35',
        'app-button-primary': '#6f42c1',
        'app-button-secondary': '#2a2a35',
        'app-badge-green': 'rgba(13, 195, 115, 0.15)',
        'app-badge-text-green': '#0dc373',
        'app-badge-purple': 'rgba(111, 66, 193, 0.15)',
        'app-badge-text-purple': '#6f42c1',

        // Original color scheme (keeping for reference)
        'light-primary': '#4B0082', // Indigo
        'light-secondary': '#FFD700', // Gold
        'light-background': '#F8F9FA', // Soft White
        'light-text': '#2C2C2C', // Dark Charcoal
        'light-accent': '#0056B3', // Royal Blue
        
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
      },
      boxShadow: {
        'canvas-card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
