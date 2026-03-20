import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";

import { RefreshControl } from "react-native";

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  padding?: number;
  contentStyle?: ViewStyle;
  style?: ViewStyle;
  hasHeader?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
};

export function Screen({
  children,
  scroll = true,
  padding = 16,
  contentStyle,
  style,
  hasHeader = true,
  onRefresh,
  refreshing = false,
}: ScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const topPad = hasHeader ? 6 : insets.top;
  const bottomPad = Math.max(insets.bottom, 12);

  const background = { backgroundColor: theme.colors.background };

  if (!scroll) {
    return (
      <View
        style={[
          styles.base,
          background,
          {
            paddingTop: topPad,
            paddingBottom: bottomPad,
            paddingHorizontal: padding,
          },
          style,
        ]}
      >
        <View style={[styles.content, contentStyle]}>{children}</View>
      </View>
    );
  }

  return (
    <ScrollView
      style={[background, style]}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingTop: topPad,
          paddingBottom: bottomPad,
          paddingHorizontal: padding,
        },
        contentStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 12,
  },
  scrollContent: {
    flexGrow: 1,
    gap: 12,
  },
});
