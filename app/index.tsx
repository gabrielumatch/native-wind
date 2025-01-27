import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/">Root</Link>
      <Link href="/(auth)">Auth</Link>
      <Link href="/(app)">App</Link>
    </View>
  );
}
