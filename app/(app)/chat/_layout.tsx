import { Stack } from "expo-router";
import { useEffect } from "react";
import { usePermission } from "@/lib/permissions/hooks";
import { ThemedStackLayout } from "@/lib/theme/index";

export default function ChatLayout() {
  const { status, request } = usePermission("microphone");

  useEffect(() => {
    if (status === "undetermined") {
      request();
    }
  }, [status, request]);

  return (
    <ThemedStackLayout>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Chat" }}
      />
    </ThemedStackLayout>
  );
}
