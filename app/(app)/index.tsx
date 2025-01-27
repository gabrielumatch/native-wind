import { Text, View } from "react-native";
import { Link } from "expo-router";
export default function index() {
  return (
    <View>
      <Text>App</Text>
      <Link href="/discovery">Discovery</Link>
      <Link href="/discovery/unlock">Unlock</Link>
    </View>
  );
}
