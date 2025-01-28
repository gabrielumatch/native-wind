import { Tabs } from "expo-router";
import { ThemedView } from "../components/ThemedView";
import { PropsWithChildren } from "react";
import { useThemedLayout } from "../hooks/useThemedLayout";

type ThemedTabLayoutProps = PropsWithChildren<{
  /** Additional screen options to merge with theme defaults */
  screenOptions?: Partial<Parameters<typeof Tabs.Screen>[0]["options"]>;
}>;

export function ThemedTabLayout({
  children,
  screenOptions,
}: ThemedTabLayoutProps) {
  const { colors } = useThemedLayout();

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
