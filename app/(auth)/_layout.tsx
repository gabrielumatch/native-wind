import { Stack } from "expo-router";
import { View } from "react-native";
import { useTheme } from "../_layout";

export default function AuthLayout() {
  const { isDarkMode } = useTheme();

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? "#1f2937" : "white",
          },
          headerTintColor: isDarkMode ? "white" : "#1f2937",
          headerTitleStyle: {
            color: isDarkMode ? "white" : "#1f2937",
          },
          contentStyle: {
            backgroundColor: isDarkMode ? "#111827" : "white",
          },
        }}
      >
        <Stack.Screen
          name="login/index"
          options={{
            title: "Login",
          }}
        />
        <Stack.Screen
          name="register/index"
          options={{
            title: "Register",
          }}
        />
      </Stack>
    </View>
  );
}
