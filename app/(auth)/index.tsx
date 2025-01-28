import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function AuthIndex() {
  return (
    <View className="flex-1 items-center justify-center p-4 bg-white">
      <View className="w-full max-w-sm space-y-6">
        <View className="space-y-2">
          <Text className="text-2xl font-bold text-center text-gray-900">
            Welcome Back
          </Text>
          <Text className="text-gray-500 text-center">
            Please sign in to continue
          </Text>
        </View>

        <View className="space-y-4">
          <Link
            href="/(auth)/login"
            className="w-full bg-blue-600 p-4 rounded-lg items-center"
          >
            <Text className="text-white font-semibold text-center">Login</Text>
          </Link>

          <Link
            href="/(auth)/register"
            className="w-full border border-gray-300 p-4 rounded-lg items-center"
          >
            <Text className="text-gray-900 font-semibold text-center">
              Create Account
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
