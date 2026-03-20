import React from "react";
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Ana Sayfa" }}
      />

      <Stack.Screen
        name="GameTheoryParse"
        options={{
          title: "Analiz",
        }}
      />
    </Stack>
  );
};
export default HomeLayout;
