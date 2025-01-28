import { Stack } from "expo-router";
import { View } from "react-native";
import { useTheme } from "../_layout";
import { getNavigationTheme } from "../../lib/theme";

export default function AuthLayout() {
  const { isDarkMode } = useTheme();
  const navigationTheme = getNavigationTheme(isDarkMode);

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <Stack screenOptions={navigationTheme}>
        <Stack.Screen
          name="login"
          options={{
            title: "Login",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: "Register",
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}
