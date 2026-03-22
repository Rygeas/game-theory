// EvolutionList.tsx

import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, ActivityIndicator, Button } from "react-native-paper";
import { router } from "expo-router";
import { usePromise } from "@/context/evolationContext";
import { Story } from "@/services/story";
import { useDeleteStory, useStories } from "@/hooks/api/useStories";
import StoryItem from "@/components/ui/StoryItem";
import { Screen } from "@/components/Screen";
import { useTheme } from "react-native-paper";
import { AppTheme } from "@/constants/theme";

const EvolutionList = () => {
  const { data, isLoading, error, refetch } = useStories();
  const { mutate: deleteStory } = useDeleteStory();
  const { setDraft } = usePromise();
  const theme = useTheme<AppTheme>();

  const handlePress = (story: Story) => {
    setDraft({ storyId: story.id, userText: "" });
    router.push(`/(protected)/list/${story.id}`);
  };

  if (isLoading) {
    return (
      <View
        style={[styles.centered, { backgroundColor: theme.colors.background }]}
      >
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[styles.centered, { backgroundColor: theme.colors.background }]}
      >
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}
        >
          Bir şeyler ters gitti.
        </Text>
        <Button mode="outlined" onPress={() => refetch()}>
          Tekrar Dene
        </Button>
      </View>
    );
  }

  return (
    <Screen scroll onRefresh={refetch} refreshing={isLoading}>
      {data?.map((story) => (
        <StoryItem
          key={story.id}
          story={story}
          onPress={() => handlePress(story)}
          onDelete={() => deleteStory(story.id)}
        />
      ))}

      {data?.length === 0 && (
        <View style={styles.emptyState}>
          <Text
            variant="bodyLarge"
            style={{
              color: theme.colors.onSurfaceVariant,
              textAlign: "center",
            }}
          >
            Henüz bir hikaye yok.
          </Text>
          <Text
            variant="bodySmall"
            style={{
              color: theme.colors.onSurfaceVariant,
              textAlign: "center",
              marginTop: 8,
              opacity: 0.7,
            }}
          >
            Ana sayfadan ilk hikayeni yazabilirsin.
          </Text>
        </View>
      )}
    </Screen>
  );
};

export default EvolutionList;

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },
});
