import { Stack } from "expo-router";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "nativewind";
import { StatusBar, View, Platform } from "react-native";

export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const queryClient = new QueryClient();

export default function RootLayout() {
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  useEffect(() => {
    setColorScheme(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(isDarkMode ? "#111827" : "white");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    toggleColorScheme();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <View className="flex-1 bg-white dark:bg-gray-900">
          <StatusBar
            barStyle={isDarkMode ? "light-content" : "dark-content"}
            backgroundColor={isDarkMode ? "#111827" : "white"}
          />
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: isDarkMode ? "#1f2937" : "white",
              },
              headerTintColor: isDarkMode ? "white" : "#1f2937",
              headerTitleStyle: {
                color: isDarkMode ? "white" : "#1f2937",
              },
              contentStyle: {
                backgroundColor: isDarkMode ? "#111827" : "white",
              },
            }}
          >
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: true }} />
            <Stack.Screen name="index" options={{ headerShown: true }} />
            <Stack.Screen name="+not-found" options={{ headerShown: true }} />
          </Stack>
        </View>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}
