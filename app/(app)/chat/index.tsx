import { Text, View } from "react-native";
import { useTheme, getThemeColors } from "../../../lib/theme";

export default function Chat() {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  return (
    <View
      style={{ backgroundColor: colors.background.primary }}
      className="flex-1 items-center justify-center p-4"
    >
      <Text
        style={{ color: colors.text.primary }}
        className="text-xl font-medium"
      >
        Chat
      </Text>
    </View>
  );
}
