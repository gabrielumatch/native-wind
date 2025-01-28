import { useTheme, getThemeColors, getNavigationTheme } from "../core";

/**
 * Custom hook for themed layouts
 * Provides common theme values and configurations for layout components
 * @returns Theme-related values and configurations
 */
export function useThemedLayout() {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const navigationTheme = getNavigationTheme(isDarkMode);

  return {
    isDarkMode,
    colors,
    navigationTheme,
  };
}
