import { Stack } from "expo-router";

export default function DiscoveryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Discovery" }}
      />
      <Stack.Screen
        name="unlock/index"
        options={{ headerShown: true, title: "Unlock" }}
      />
    </Stack>
  );
}
