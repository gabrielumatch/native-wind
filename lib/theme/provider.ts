import { useState, useEffect } from "react";
import { useColorScheme } from "nativewind";
import { ThemeStorage } from "../storage";

/**
 * Theme provider hook that manages theme state
 * Handles:
 * - Theme persistence with storage
 * - NativeWind color scheme sync
 * - Theme toggle functionality
 */
export const useThemeProvider = () => {
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Load saved theme on startup
  useEffect(() => {
    ThemeStorage.get().then((savedTheme) => {
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme);
        setColorScheme(savedTheme ? "dark" : "light");
      }
      setIsThemeLoaded(true);
    });
  }, []);

  // Update NativeWind color scheme when theme changes
  useEffect(() => {
    if (isThemeLoaded) {
      setColorScheme(isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode, isThemeLoaded]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      ThemeStorage.set(newValue);
      toggleColorScheme();
      return newValue;
    });
  };

  return {
    isDarkMode,
    toggleTheme,
    isThemeLoaded,
  };
};
