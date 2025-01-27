import { Stack } from "expo-router";
import { useEffect } from "react";
import { usePermission } from "../../../lib/permissions/hooks";

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
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Profile" }}
      />
    </Stack>
  );
}
