import React from "react";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const HomeLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Ana Sayfa" }}
      />

      <Stack.Screen
        name="GameTheoryParse"
        options={{
          title: t("analysis.analysis"),
        }}
      />
    </Stack>
  );
};
export default HomeLayout;
