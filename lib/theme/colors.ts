import { Platform } from "react-native";
import { ThemeColors } from "./types";
import { COLORS } from "./constants";

/**
 * Core theme colors configuration
 * Provides consistent color palette across the app based on theme mode
 *
 * @param isDarkMode - Current theme mode
 * @returns Theme color object with all color values
 */
export const getThemeColors = (isDarkMode: boolean): ThemeColors => {
  const mode = isDarkMode ? "dark" : "light";
  const colors = COLORS[mode];

  return {
    background: colors.background,
    text: colors.text,
    statusBar: {
      style: isDarkMode ? "light-content" : "dark-content",
      backgroundColor: colors.background.primary,
    },
    navigation: {
      tabBar: {
        background: colors.background.secondary,
        border: colors.background.tertiary,
        activeColor: COLORS.shared.accent,
        inactiveColor: colors.text.secondary,
      },
      header: {
        background: colors.background.secondary,
        text: colors.text.primary,
      },
    },
  };
};

/**
 * Navigation theme configuration for stack navigators
 * Provides consistent styling for headers and navigation elements
 *
 * @param isDarkMode - Current theme mode
 */
export const getNavigationTheme = (isDarkMode: boolean) => {
  const colors = getThemeColors(isDarkMode);
  return {
    headerStyle: {
      backgroundColor: colors.navigation.header.background,
    },
    headerTintColor: colors.navigation.header.text,
    headerTitleStyle: {
      color: colors.navigation.header.text,
    },
    contentStyle: {
      backgroundColor: colors.background.primary,
    },
  };
};

/**
 * Tab bar theme configuration
 * Provides consistent styling for bottom tab navigation
 *
 * @param isDarkMode - Current theme mode
 */
export const getTabBarTheme = (isDarkMode: boolean) => {
  const colors = getThemeColors(isDarkMode);
  return {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: colors.navigation.tabBar.background,
      borderTopColor: colors.navigation.tabBar.border,
    },
    tabBarActiveTintColor: colors.navigation.tabBar.activeColor,
    tabBarInactiveTintColor: colors.navigation.tabBar.inactiveColor,
  };
};

/**
 * Status bar theme configuration
 * Handles platform-specific status bar styling
 *
 * @param isDarkMode - Current theme mode
 */
export const getStatusBarConfig = (isDarkMode: boolean) => {
  const colors = getThemeColors(isDarkMode);
  return {
    barStyle: colors.statusBar.style,
    backgroundColor:
      Platform.OS === "android" ? colors.statusBar.backgroundColor : undefined,
  };
};
