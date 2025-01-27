import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900 gap-4">
      <Link href="/" asChild>
        <Text className="text-gray-900 dark:text-white text-lg font-medium">
          Root
        </Text>
      </Link>

      <Link href="/(auth)" asChild>
        <Text className="text-gray-900 dark:text-white text-lg font-medium">
          Auth
        </Text>
      </Link>

      <Link href="/(app)" asChild>
        <Text className="text-gray-900 dark:text-white text-lg font-medium">
          App
        </Text>
      </Link>
    </View>
  );
}
