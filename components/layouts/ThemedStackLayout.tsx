import { Stack } from "expo-router";
import { ThemedView } from "./ThemedView";
import { PropsWithChildren } from "react";
import { useThemedLayout } from "./useThemedLayout";

/**
 * Props for ThemedStackLayout component
 * Allows customization of Stack.Screen options
 */
type ThemedStackLayoutProps = PropsWithChildren<{
  /** Additional screen options to merge with theme defaults */
  screenOptions?: Partial<Parameters<typeof Stack.Screen>[0]["options"]>;
}>;

/**
 * Themed Stack Navigation Layout
 * Provides consistent theme-aware styling for stack navigation
 * Uses ThemedView as base container
 *
 * @param screenOptions - Additional Stack.Screen options
 */
export function ThemedStackLayout({
  children,
  screenOptions,
}: ThemedStackLayoutProps) {
  const { navigationTheme } = useThemedLayout();

  return (
    <ThemedView
      useCustomBackground
      className="flex-1 bg-white dark:bg-gray-900"
    >
      <Stack screenOptions={{ ...navigationTheme, ...screenOptions }}>
        {children}
      </Stack>
    </ThemedView>
  );
}
