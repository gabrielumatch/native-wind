import { StatusBar } from "react-native";
import { useTheme } from "../lib/theme";
import { getThemeColors } from "../lib/theme";

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
