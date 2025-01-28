import { View, ViewProps } from "react-native";
import { useTheme } from "@/lib/theme";
import { getThemeColors } from "@/lib/theme";

/**
 * Props for ThemedView component
 * Extends ViewProps to maintain all View functionality
 */
type ThemedViewProps = ViewProps & {
  /** Whether to use custom background color instead of theme default */
  useCustomBackground?: boolean;
};

/**
 * Base themed view component
 * Provides consistent theme-aware styling for view containers
 *
 * @param useCustomBackground - Opt out of default background color
 * @param className - TailwindCSS classes
 * @param style - Additional React Native styles
 */
export function ThemedView({
  children,
  className = "flex-1",
  useCustomBackground = false,
  style,
  ...props
}: ThemedViewProps) {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  return (
    <View
      className={className}
      style={[
        !useCustomBackground && { backgroundColor: colors.background.primary },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
