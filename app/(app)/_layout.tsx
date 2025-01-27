import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../_layout";
import { View } from "react-native";
import { getThemeColors } from "../../lib/theme";

export default function AppLayout() {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  return (
    <View
      style={{ backgroundColor: colors.background.primary }}
      className="flex-1"
    >
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
        }}
      >
        <Tabs.Screen
          name="discovery"
          options={{
            title: "Discovery",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="search" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="comments" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </View>
  );
}
