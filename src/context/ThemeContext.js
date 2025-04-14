import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const ThemeContext = createContext();

// Theme variables
const themes = {
  dark: {
    '--app-background': '#0f172a',
    '--app-card': '#1e293b',
    '--app-card-hover': '#334155',
    '--app-border': '#334155',
    '--app-text-primary': '#f8fafc',
    '--app-text-secondary': '#94a3b8',
    '--app-accent-purple': '#8b5cf6',
  },
  light: {
    '--app-background': '#f8fafc',
    '--app-card': '#ffffff',
    '--app-card-hover': '#f1f5f9',
    '--app-border': '#e2e8f0',
    '--app-text-primary': '#0f172a',
    '--app-text-secondary': '#64748b',
    '--app-accent-purple': '#8b5cf6',
  }
};

// Provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  
  // Update theme variables in document root
  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    Object.keys(themes[newTheme]).forEach(property => {
      root.style.setProperty(property, themes[newTheme][property]);
    });
  };
  
  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('canvas-app-theme', newTheme);
    applyTheme(newTheme);
  };
  
  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('canvas-app-theme') || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};