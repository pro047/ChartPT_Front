'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  resetToSystem: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const isDark = savedMode === 'dark' || (!savedMode && prefersDark);
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    localStorage.setItem('darkMode', newMode ? 'dark' : 'light');
    setIsDarkMode(newMode);
  };

  const resetToSystem = () => {
    localStorage.removeItem('darkMode');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setIsDarkMode(prefersDark);
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleDarkMode, resetToSystem }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
