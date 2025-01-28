import { Text, View } from "react-native";
import { useTheme, getThemeColors } from "@/lib/theme/index";

export default function Settings() {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  return (
    <View
      style={{ backgroundColor: colors.background.primary }}
      className="flex-1 p-4"
    >
      <Text
        style={{ color: colors.text.primary }}
        className="text-xl font-semibold"
      >
        Settings
      </Text>
    </View>
  );
}
