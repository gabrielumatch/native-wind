import { View, ViewProps } from "react-native";
import { useThemedLayout } from "../hooks/useThemedLayout";

type ThemedViewProps = ViewProps & {
  /** Whether to use custom background color instead of theme default */
  useCustomBackground?: boolean;
};

export function ThemedView({
  children,
  className = "flex-1",
  useCustomBackground = false,
  style,
  ...props
}: ThemedViewProps) {
  const { colors } = useThemedLayout();

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
