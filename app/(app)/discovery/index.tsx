import { Link } from "expo-router";
import { Text, View, Pressable } from "react-native";
import { useTheme, getThemeColors } from "../../../lib/theme";

export default function Discovery() {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  return (
    <View
      className="flex-1 items-center justify-center p-4 gap-4"
      style={{ backgroundColor: colors.background.primary }}
    >
      <Text
        style={{ color: colors.text.primary }}
        className="text-2xl font-bold"
      >
        App
      </Text>

      <Link href="/discovery" asChild>
        <Pressable
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: colors.navigation.tabBar.activeColor }}
        >
          <Text className="text-white">Discovery</Text>
        </Pressable>
      </Link>

      <Link href="/discovery/unlock" asChild>
        <Pressable
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: colors.navigation.tabBar.activeColor }}
        >
          <Text className="text-white">Unlock</Text>
        </Pressable>
      </Link>
    </View>
  );
}
