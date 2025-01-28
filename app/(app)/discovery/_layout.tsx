import { Stack } from "expo-router";
import { useEffect } from "react";
import { usePermission } from "@/lib/permissions/hooks";

export default function DiscoveryLayout() {
  const { status, request } = usePermission("location");

  useEffect(() => {
    if (status === "undetermined") {
      request();
    }
  }, [status, request]);

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
