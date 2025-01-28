import { View, Switch, ViewProps } from "react-native";
import { useTheme } from "../core";
import { useThemedLayout } from "../hooks/useThemedLayout";
import { ThemedText } from "./ThemedText";

type ThemeToggleProps = Omit<ViewProps, "style"> & {
  /** Show label next to the toggle */
  showLabel?: boolean;
  /** Custom label text */
  label?: string;
};

/**
 * Theme Toggle Component
 * A reusable switch component for toggling between light and dark themes
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ThemeToggle />
 *
 * // With custom label
 * <ThemeToggle showLabel label="Dark Mode" />
 * ```
 */
export function ThemeToggle({
  showLabel = true,
  label = "Dark Mode",
  className = "flex-row items-center justify-between p-4",
  ...props
}: ThemeToggleProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const { colors } = useThemedLayout();

  return (
    <View className={className} {...props}>
      {showLabel && (
        <ThemedText className="text-base font-medium mr-4">{label}</ThemedText>
      )}
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{
          false: colors.background.tertiary,
          true: colors.navigation.tabBar.activeColor,
        }}
        thumbColor={colors.background.primary}
      />
    </View>
  );
}
