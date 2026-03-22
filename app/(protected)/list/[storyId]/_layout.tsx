import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { theme } from "@/constants/theme";

const StoryDetailStackLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: "#ffffff",
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: "Manrope_600SemiBold",
          color: "#ffffff",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: t("drawer.stories") }} />
      <Stack.Screen
        name="versions/index"
        options={{ title: t("common.history") }}
      />
      <Stack.Screen
        name="versions/[version]/index"
        options={{ title: t("analysis.evaluation") }}
      />
    </Stack>
  );
};

export default StoryDetailStackLayout;

const styles = StyleSheet.create({});
