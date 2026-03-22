// constants/theme.ts

import { MD3LightTheme, MD3Theme } from "react-native-paper";
export type AppTheme = MD3Theme & {
  colors: MD3Theme["colors"] & {
    surfaceContainerLow: string;
    surfaceContainerLowest: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
  };
};
export const theme = {
  ...MD3LightTheme,
  fonts: {
    ...MD3LightTheme.fonts,
    displayLarge: {
      ...MD3LightTheme.fonts.displayLarge,
      fontFamily: "Manrope_700Bold",
      letterSpacing: -0.02,
    },
    displayMedium: {
      ...MD3LightTheme.fonts.displayMedium,
      fontFamily: "Manrope_700Bold",
      letterSpacing: -0.02,
    },
    displaySmall: {
      ...MD3LightTheme.fonts.displaySmall,
      fontFamily: "Manrope_600SemiBold",
      letterSpacing: -0.02,
    },
    headlineLarge: {
      ...MD3LightTheme.fonts.headlineLarge,
      fontFamily: "Manrope_600SemiBold",
    },
    headlineMedium: {
      ...MD3LightTheme.fonts.headlineMedium,
      fontFamily: "Manrope_600SemiBold",
    },
    headlineSmall: {
      ...MD3LightTheme.fonts.headlineSmall,
      fontFamily: "Manrope_500Medium",
    },
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      fontFamily: "Inter_600SemiBold",
    },
    titleMedium: {
      ...MD3LightTheme.fonts.titleMedium,
      fontFamily: "Inter_500Medium",
    },
    titleSmall: {
      ...MD3LightTheme.fonts.titleSmall,
      fontFamily: "Inter_500Medium",
    },
    bodyLarge: {
      ...MD3LightTheme.fonts.bodyLarge,
      fontFamily: "Inter_400Regular",
      lineHeight: 28,
    },
    bodyMedium: {
      ...MD3LightTheme.fonts.bodyMedium,
      fontFamily: "Inter_400Regular",
      lineHeight: 24,
    },
    bodySmall: {
      ...MD3LightTheme.fonts.bodySmall,
      fontFamily: "Inter_400Regular",
    },
    labelLarge: {
      ...MD3LightTheme.fonts.labelLarge,
      fontFamily: "Inter_500Medium",
    },
    labelMedium: {
      ...MD3LightTheme.fonts.labelMedium,
      fontFamily: "Inter_400Regular",
    },
    labelSmall: {
      ...MD3LightTheme.fonts.labelSmall,
      fontFamily: "Inter_400Regular",
    },
  },
  colors: {
    ...MD3LightTheme.colors,
    primary: "#516452",
    onPrimary: "#ffffff",
    primaryContainer: "#465846",
    onPrimaryContainer: "#ffffff",
    secondary: "#5b6331",
    onSecondary: "#ffffff",
    background: "#fbf9f5",
    onBackground: "#31332f",
    surface: "#fbf9f5",
    onSurface: "#31332f",
    surfaceVariant: "#f5f4ef",
    onSurfaceVariant: "#6b6d68",
    surfaceContainerLowest: "#ffffff",
    surfaceContainerLow: "#f5f4ef",
    surfaceContainer: "#eeecea",
    surfaceContainerHigh: "#e8e6e3",
    outline: "rgba(178, 178, 172, 0.15)",
    outlineVariant: "rgba(178, 178, 172, 0.15)",
    error: "#a73b21",
    onError: "#ffffff",
  },
  roundness: 6, // 1.5rem ≈ 24px için Card'larda override yapacağız
};
