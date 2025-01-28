import { TextProps, ViewProps } from "react-native";
import { Stack, Tabs } from "expo-router";

/**
 * Theme context type definition
 * Provides dark mode state and toggle functionality throughout the app
 */
export type ThemeContextType = {
  /** Current theme mode */
  isDarkMode: boolean;
  /** Function to toggle between light and dark mode */
  toggleTheme: () => void;
};

/**
 * Theme colors type definition
 * Defines the structure of the app's color palette
 */
export type ThemeColors = {
  background: {
    /** Main background color */
    primary: string;
    /** Secondary background for cards, headers */
    secondary: string;
    /** Tertiary background for borders, dividers */
    tertiary: string;
  };
  text: {
    /** Primary text color */
    primary: string;
    /** Secondary text for subtitles, captions */
    secondary: string;
  };
  statusBar: {
    /** Status bar content style */
    style: "light-content" | "dark-content";
    /** Status bar background color */
    backgroundColor: string;
  };
  navigation: {
    tabBar: {
      /** Tab bar background color */
      background: string;
      /** Tab bar border color */
      border: string;
      /** Active tab color */
      activeColor: string;
      /** Inactive tab color */
      inactiveColor: string;
    };
    header: {
      /** Header background color */
      background: string;
      /** Header text color */
      text: string;
    };
  };
};

/**
 * Props for themed stack layout
 */
export type ThemedStackLayoutProps = {
  /** Additional screen options to merge with theme defaults */
  screenOptions?: Partial<Parameters<typeof Stack.Screen>[0]["options"]>;
  children: React.ReactNode;
};

/**
 * Props for themed tab layout
 */
export type ThemedTabLayoutProps = {
  /** Additional screen options to merge with theme defaults */
  screenOptions?: Partial<Parameters<typeof Tabs.Screen>[0]["options"]>;
  children: React.ReactNode;
};

/**
 * Props for themed view component
 */
export type ThemedViewProps = Omit<ViewProps, "style"> & {
  /** Whether to use custom background color instead of theme default */
  useCustomBackground?: boolean;
};

/**
 * Props for themed text component
 */
export type ThemedTextProps = Omit<TextProps, "style"> & {
  /** Text color variant */
  variant?: "primary" | "secondary";
};
