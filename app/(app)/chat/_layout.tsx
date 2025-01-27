import { Stack } from "expo-router";
import { useEffect } from "react";
import { usePermission } from "../../../lib/permissions/hooks";

export default function ChatLayout() {
  const { status, request } = usePermission("microphone");

  useEffect(() => {
    if (status === "undetermined") {
      request();
    }
  }, [status, request]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Chat" }}
      />
    </Stack>
  );
}
