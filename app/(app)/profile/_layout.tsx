import { Stack } from "expo-router";
import { useEffect } from "react";
import { usePermission } from "@/lib/permissions/hooks";
import { ThemedStackLayout } from "@/components/layouts/ThemedStackLayout";

export default function ProfileLayout() {
  const camera = usePermission("camera");
  const gallery = usePermission("photoLibrary");

  useEffect(() => {
    // Request camera permission if not determined
    if (camera.status === "undetermined") {
      camera.request();
    }
    // Request gallery permission if not determined
    if (gallery.status === "undetermined") {
      gallery.request();
    }
  }, [camera.status, gallery.status]);

  return (
    <ThemedStackLayout>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "Settings",
        }}
      />
    </ThemedStackLayout>
  );
}
