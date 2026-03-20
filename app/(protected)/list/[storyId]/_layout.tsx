import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const StoryDetailStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Hikaye Detayı" }} />
      <Stack.Screen name="versions/index" options={{ title: "Geçmiş" }} />
      <Stack.Screen
        name="versions/[version]/index"
        options={{ title: "Analiz Detayı" }}
      />
    </Stack>
  );
};

export default StoryDetailStackLayout;

const styles = StyleSheet.create({});
