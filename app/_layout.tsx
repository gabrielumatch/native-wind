import { Stack } from "expo-router";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "nativewind";
import { StatusBar, View } from "react-native";
import { getThemeColors } from "../lib/theme";
import { ThemeStorage } from "../lib/storage";

export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const queryClient = new QueryClient();

export default function RootLayout() {
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Load saved theme on startup
  useEffect(() => {
    ThemeStorage.get().then((savedTheme) => {
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme);
        setColorScheme(savedTheme ? "dark" : "light");
      }
      setIsThemeLoaded(true);
    });
  }, []);

  // Update NativeWind color scheme when theme changes
  useEffect(() => {
    if (isThemeLoaded) {
      setColorScheme(isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode, isThemeLoaded]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      ThemeStorage.set(newValue);
      toggleColorScheme();
      return newValue;
    });
  };

  const colors = getThemeColors(isDarkMode);

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
          <StatusBar
            barStyle={isDarkMode ? "light-content" : "dark-content"}
            backgroundColor={colors.background.primary}
          />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: colors.background.primary,
              },
            }}
          >
            <Stack.Screen name="(app)" />
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.background.secondary,
                },
                headerTitleStyle: {
                  color: colors.text.primary,
                },
                headerTintColor: colors.text.primary,
              }}
            />
            <Stack.Screen
              name="index"
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.background.secondary,
                },
                headerTitleStyle: {
                  color: colors.text.primary,
                },
                headerTintColor: colors.text.primary,
              }}
            />
            <Stack.Screen
              name="+not-found"
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.background.secondary,
                },
                headerTitleStyle: {
                  color: colors.text.primary,
                },
                headerTintColor: colors.text.primary,
              }}
            />
          </Stack>
        </View>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}
