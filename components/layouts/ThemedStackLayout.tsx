import { Stack } from "expo-router";
import { useTheme } from "@/lib/theme";
import { getNavigationTheme } from "@/lib/theme";
import { ThemedView } from "./ThemedView";
import { PropsWithChildren } from "react";

type ThemedStackLayoutProps = PropsWithChildren<{
  screenOptions?: Partial<Parameters<typeof Stack.Screen>[0]["options"]>;
}>;

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
