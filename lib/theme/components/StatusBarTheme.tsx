import { StatusBar } from "react-native";
import { useTheme, getThemeColors } from "../core";

export function StatusBarTheme() {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  return (
    <StatusBar
      barStyle={isDarkMode ? "light-content" : "dark-content"}
      backgroundColor={colors.background.primary}
    />
  );
}
