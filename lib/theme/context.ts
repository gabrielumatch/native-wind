import { createContext, useContext } from "react";

/**
 * Theme context type definition
 * Provides dark mode state and toggle functionality throughout the app
 */
type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

/**
 * Theme context with default values
 * Used to provide theme state across the component tree
 */
export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

/**
 * Custom hook to access theme context
 * Use this in components that need to respond to theme changes
 */
export const useTheme = () => useContext(ThemeContext);
