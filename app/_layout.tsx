import { Stack } from "expo-router";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "nativewind";
import { View } from "react-native";

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    toggleColorScheme();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <View className="flex-1 bg-white dark:bg-gray-900">
          <Stack>
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
