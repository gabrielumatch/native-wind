import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function index() {
  return (
    <View>
      <Link href="/(auth)">Auth</Link>
      <Link href="/(auth)/login/index">Login</Link>
      <Link href="/(auth)/register/index">Register</Link>
    </View>
  );
}
