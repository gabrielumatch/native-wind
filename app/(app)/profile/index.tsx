import { Text, View, Switch } from "react-native";
import { useTheme, getThemeColors } from "@/lib/theme/index";
import { Link } from "expo-router";

export default function Profile() {
  const { isDarkMode, toggleTheme } = useTheme();
  const colors = getThemeColors(isDarkMode);

  return (
    <View
      style={{ backgroundColor: colors.background.primary }}
      className="flex-1 p-4"
    >
      <View
        style={{ backgroundColor: colors.background.secondary }}
        className="flex-row items-center justify-between p-4 rounded-lg"
      >
        <Text
          style={{ color: colors.text.primary }}
          className="text-lg font-medium"
        >
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{
            false: colors.background.tertiary,
            true: colors.navigation.tabBar.activeColor,
          }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      <View className="mt-4">
        <Text style={{ color: colors.text.secondary }} className="text-base">
          Toggle between light and dark mode
        </Text>
      </View>
      <Link href="./profile/settings">
        <Text style={{ color: colors.text.primary }} className="text-base">
          Settings
        </Text>
      </Link>
    </View>
  );
}
