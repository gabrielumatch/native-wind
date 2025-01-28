# Theme System

A comprehensive theme system for React Native applications with dark mode support.

## Structure

```
lib/theme/
├── constants.ts    # Theme-related constants (colors, sizes)
├── types.ts       # TypeScript type definitions
├── colors.ts      # Color utilities and theme functions
├── context.ts     # Theme context and basic hook
├── provider.ts    # Theme provider implementation
├── components/    # Themed UI components
├── layouts/       # Themed navigation layouts
└── hooks/         # Theme-related hooks
```

## Core Features

### Theme Provider

Manages theme state with persistence and NativeWind integration:

```tsx
function App() {
  const { isDarkMode, toggleTheme } = useThemeProvider();
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <App />
    </ThemeContext.Provider>
  );
}
```

### Components

1. Base Components:

```tsx
// Themed View with background
<ThemedView className="p-4">
  {/* Content */}
</ThemedView>

// Themed Text with variants
<ThemedText variant="secondary">
  Subtitle text
</ThemedText>
```

2. UI Components:

```tsx
// Theme toggle switch
<ThemeToggle label="Dark Mode" />

// Status bar with theme awareness
<StatusBarTheme />
```

3. Navigation Layouts:

```tsx
// Stack Navigation
<ThemedStackLayout>
  <Stack.Screen name="home" />
</ThemedStackLayout>

// Tab Navigation
<ThemedTabLayout>
  <Tabs.Screen name="home" />
</ThemedTabLayout>
```

## Theme Hook Usage

```tsx
function MyComponent() {
  // Basic theme state
  const { isDarkMode, toggleTheme } = useTheme();

  // Layout utilities
  const { colors, navigationTheme } = useThemedLayout();

  return (
    <ThemedView>
      <ThemedText>Current theme: {isDarkMode ? "Dark" : "Light"}</ThemedText>
    </ThemedView>
  );
}
```

## Color System

Colors are defined in `constants.ts` and organized by theme mode:

- Background colors (primary, secondary, tertiary)
- Text colors (primary, secondary)
- Navigation colors (header, tab bar)
- Status bar colors
- Shared colors (accent)

## Best Practices

1. Component Usage:

   - Use themed components instead of raw React Native components
   - Leverage NativeWind classes for responsive styling
   - Use variants for consistent text styling

2. Theme Access:

   - Use `useTheme()` for simple theme state
   - Use `useThemedLayout()` for complex theme values
   - Access colors through the hooks, not directly

3. Customization:

   - Extend types for custom theme values
   - Add new color constants to `constants.ts`
   - Create new themed components as needed

4. Navigation:
   - Use themed layouts for consistent navigation styling
   - Customize through screenOptions prop
   - Follow the navigation theme patterns

## Type Safety

The theme system is fully typed with TypeScript, providing:

- Type-safe color access
- Component prop validation
- Theme context typing
