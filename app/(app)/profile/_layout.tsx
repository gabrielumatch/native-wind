import { Stack } from "expo-router";
import { useEffect } from "react";
import { usePermission } from "../../../lib/permissions/hooks";
import { useTheme } from "../../_layout";
import { getThemeColors, getNavigationTheme } from "../../../lib/theme";

export default function ProfileLayout() {
  const camera = usePermission("camera");
  const gallery = usePermission("photoLibrary");
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const navigationTheme = getNavigationTheme(isDarkMode);

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
        options={{
          headerShown: true,
          title: "Profile",
          ...navigationTheme,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "Settings",
          ...navigationTheme,
        }}
      />
    </Stack>
  );
}
