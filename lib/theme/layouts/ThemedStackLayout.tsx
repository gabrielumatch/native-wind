import { Stack } from "expo-router";
import { ThemedView } from "../components/ThemedView";
import { PropsWithChildren } from "react";
import { useThemedLayout } from "../hooks/useThemedLayout";

type ThemedStackLayoutProps = PropsWithChildren<{
  /** Additional screen options to merge with theme defaults */
  screenOptions?: Partial<Parameters<typeof Stack.Screen>[0]["options"]>;
}>;

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
