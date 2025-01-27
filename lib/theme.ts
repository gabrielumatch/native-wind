import { Platform } from "react-native";

export const getThemeColors = (isDarkMode: boolean) => ({
  // Background colors
  background: {
    primary: isDarkMode ? "#111827" : "white",
    secondary: isDarkMode ? "#1f2937" : "white",
    tertiary: isDarkMode ? "#374151" : "#e5e7eb",
  },
  // Text colors
  text: {
    primary: isDarkMode ? "white" : "#1f2937",
    secondary: isDarkMode ? "#9ca3af" : "#6b7280",
  },
  // Status bar
  statusBar: {
    style: isDarkMode ? "light-content" : "dark-content",
    backgroundColor: isDarkMode ? "#111827" : "white",
  },
  // Navigation
  navigation: {
    tabBar: {
      background: isDarkMode ? "#1f2937" : "white",
      border: isDarkMode ? "#374151" : "#e5e7eb",
      activeColor: "#81b0ff",
      inactiveColor: isDarkMode ? "#9ca3af" : "#6b7280",
    },
    header: {
      background: isDarkMode ? "#1f2937" : "white",
      text: isDarkMode ? "white" : "#1f2937",
    },
  },
});

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

export const getStatusBarConfig = (isDarkMode: boolean) => {
  const colors = getThemeColors(isDarkMode);

  return {
    barStyle: colors.statusBar.style as "light-content" | "dark-content",
    backgroundColor:
      Platform.OS === "android" ? colors.statusBar.backgroundColor : undefined,
  };
};
