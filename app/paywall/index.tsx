// app/paywall.tsx

import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";
import { router } from "expo-router";
import { useTheme } from "react-native-paper";
import { AppTheme } from "@/constants/theme";

const Paywall = () => {
  const theme = useTheme<AppTheme>();

  useEffect(() => {
    const present = async () => {
      const result = await RevenueCatUI.presentPaywall();

      switch (result) {
        case PAYWALL_RESULT.PURCHASED:
        case PAYWALL_RESULT.RESTORED:
          router.back();
          break;
        default:
          router.back();
          break;
      }
    };

    present();
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ActivityIndicator color={theme.colors.primary} />
    </View>
  );
};

export default Paywall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
