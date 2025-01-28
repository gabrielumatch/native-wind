import { Stack } from "expo-router";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "react-native";
import {
  getNavigationTheme,
  getThemeColors,
  ThemeContext,
  useThemeProvider,
  StatusBarTheme,
} from "@/lib/theme/index";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { isDarkMode, toggleTheme, isThemeLoaded } = useThemeProvider();

  const colors = getThemeColors(isDarkMode);
  const navigationTheme = getNavigationTheme(isDarkMode);

  if (!isThemeLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <View
          style={{ backgroundColor: colors.background.primary }}
          className="flex-1"
        >
          <StatusBarTheme />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: colors.background.primary,
              },
            }}
          >
            <Stack.Screen name="(app)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen
              name="index"
              options={{
                headerShown: true,
                ...navigationTheme,
              }}
            />
            <Stack.Screen
              name="+not-found"
              options={{
                headerShown: true,
                ...navigationTheme,
              }}
            />
          </Stack>
        </View>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}
