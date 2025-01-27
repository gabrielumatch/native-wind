import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../_layout";
import { View } from "react-native";

export default function AppLayout() {
  const { isDarkMode } = useTheme();

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDarkMode ? "#1f2937" : "white",
            borderTopColor: isDarkMode ? "#374151" : "#e5e7eb",
          },
          tabBarActiveTintColor: "#81b0ff",
          tabBarInactiveTintColor: isDarkMode ? "#9ca3af" : "#6b7280",
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
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
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
          name="index"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </View>
  );
}
