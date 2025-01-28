import { Stack } from "expo-router";
import { ThemedStackLayout } from "@/lib/theme/index";

export default function AuthLayout() {
  return (
    <ThemedStackLayout>
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
          headerShown: true,
        }}
      />
    </ThemedStackLayout>
  );
}
