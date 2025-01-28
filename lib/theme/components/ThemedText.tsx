import { Text, TextProps } from "react-native";
import { useThemedLayout } from "../hooks/useThemedLayout";

type ThemedTextVariant = "primary" | "secondary";

type ThemedTextProps = Omit<TextProps, "style"> & {
  /** Text color variant */
  variant?: ThemedTextVariant;
};

/**
 * Themed Text Component
 * Provides consistent text styling with theme awareness
 *
 * @example
 * ```tsx
 * // Primary text (default)
 * <ThemedText>Hello World</ThemedText>
 *
 * // Secondary text
 * <ThemedText variant="secondary">Subtitle</ThemedText>
 *
 * // With custom className
 * <ThemedText className="text-lg font-bold">Bold Text</ThemedText>
 * ```
 */
export function ThemedText({
  variant = "primary",
  className = "",
  children,
  ...props
}: ThemedTextProps) {
  const { colors } = useThemedLayout();

  return (
    <Text
      className={className}
      style={{ color: colors.text[variant] }}
      {...props}
    >
      {children}
    </Text>
  );
}
