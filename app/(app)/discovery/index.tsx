import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function index() {
  return (
    <View className="flex-1 items-center justify-center p-4 gap-4 bg-white dark:bg-gray-900">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white">
        App
      </Text>
      <Link href="/discovery" className="bg-primary px-4 py-2 rounded-lg">
        <Text className="text-white">Discovery</Text>
      </Link>
      <Link
        href="/discovery/unlock"
        className="bg-green-500 px-4 py-2 rounded-lg"
      >
        <Text className="text-white">Unlock</Text>
      </Link>
    </View>
  );
}
