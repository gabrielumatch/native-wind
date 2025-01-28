/**
 * Theme color constants
 * Define all color values in one place for easy maintenance
 */
export const COLORS = {
  light: {
    background: {
      primary: "white",
      secondary: "white",
      tertiary: "#e5e7eb",
    },
    text: {
      primary: "#1f2937",
      secondary: "#6b7280",
    },
  },
  dark: {
    background: {
      primary: "#111827",
      secondary: "#1f2937",
      tertiary: "#374151",
    },
    text: {
      primary: "white",
      secondary: "#9ca3af",
    },
  },
  shared: {
    accent: "#81b0ff",
  },
} as const;
