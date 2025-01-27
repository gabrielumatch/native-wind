import { Text, View, Switch, Pressable } from "react-native";
import { useTheme } from "../../_layout";

export default function Index() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View className="flex-1 p-4 dark:bg-gray-900 bg-white">
      <View className="flex-row items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <Text className="text-lg font-medium dark:text-white text-gray-900">
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      <View className="mt-4">
        <Text className="text-gray-600 dark:text-gray-300">
          Toggle between light and dark mode
        </Text>
      </View>
    </View>
  );
}
