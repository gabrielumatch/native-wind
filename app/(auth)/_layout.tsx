import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
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
  );
}
