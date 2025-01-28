import { View, ViewProps } from "react-native";
import { useTheme } from "../../lib/theme";
import { getThemeColors } from "../../lib/theme";

type ThemedViewProps = ViewProps & {
  useCustomBackground?: boolean;
};

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
