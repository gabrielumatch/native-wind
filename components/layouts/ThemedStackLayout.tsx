import { Stack } from "expo-router";
import { useTheme } from "@/lib/theme";
import { getNavigationTheme } from "@/lib/theme";
import { ThemedView } from "./ThemedView";
import { PropsWithChildren } from "react";

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
  const { isDarkMode } = useTheme();
  const navigationTheme = getNavigationTheme(isDarkMode);

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
