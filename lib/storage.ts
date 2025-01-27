import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "@app_theme";

export const ThemeStorage = {
  get: async () => {
    try {
      const theme = await AsyncStorage.getItem(THEME_KEY);
      return theme === "dark";
    } catch {
      return null;
    }
  },

  set: async (isDark: boolean) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    } catch {
      // Handle error silently
    }
  },
};
