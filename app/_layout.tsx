import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(app)" options={{ headerShown: true }} />
      <Stack.Screen name="(auth)" options={{ headerShown: true }} />
      <Stack.Screen name="index" options={{ headerShown: true }} />
      <Stack.Screen name="+not-found" options={{ headerShown: true }} />
    </Stack>
  );
}
