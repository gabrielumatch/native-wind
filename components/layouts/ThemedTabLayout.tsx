import { Tabs } from "expo-router";
import { useTheme } from "@/lib/theme";
import { getThemeColors } from "@/lib/theme";
import { ThemedView } from "./ThemedView";
import { PropsWithChildren } from "react";

type ThemedTabLayoutProps = PropsWithChildren<{
  screenOptions?: Partial<Parameters<typeof Tabs.Screen>[0]["options"]>;
}>;

export function ThemedTabLayout({
  children,
  screenOptions,
}: ThemedTabLayoutProps) {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  return (
    <ThemedView>
      <Tabs
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background.secondary,
          },
          headerTitleStyle: {
            color: colors.text.primary,
          },
          headerTintColor: colors.text.primary,
          tabBarStyle: {
            backgroundColor: colors.background.secondary,
            borderTopColor: colors.background.tertiary,
          },
          tabBarActiveTintColor: colors.navigation.tabBar.activeColor,
          tabBarInactiveTintColor: colors.navigation.tabBar.inactiveColor,
          ...screenOptions,
        }}
      >
        {children}
      </Tabs>
    </ThemedView>
  );
}
