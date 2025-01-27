import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="discovery/index"
        options={{
          title: "Discovery",
        }}
      />
      <Stack.Screen
        name="discovery/unlock/index"
        options={{
          title: "Unlock",
        }}
      />
    </Stack>
  );
}
