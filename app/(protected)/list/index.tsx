// EvolutionList.tsx

import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Animated,
  PanResponder,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { usePromise } from "@/context/evolationContext";
import { Story } from "@/services/story";
import { useDeleteStory, useStories } from "@/hooks/api/useStories";
import StoryItem from "@/components/ui/StoryItem";
import { Screen } from "@/components/Screen";

const EvolutionList = () => {
  const { data, isLoading, error, refetch } = useStories();
  const { mutate: deleteStory } = useDeleteStory();
  const { setDraft } = usePromise();

  const handlePress = (story: Story) => {
    setDraft({ storyId: story.id, userText: "" });
    router.push(`/(protected)/list/${story.id}`);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hata oluştu</Text>
        <Pressable onPress={() => refetch()} style={{ marginTop: 10 }}>
          <Text style={{ color: "blue" }}>Tekrar Dene</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Screen scroll={true} onRefresh={refetch} refreshing={isLoading}>
      {data?.map((story) => (
        <StoryItem
          key={story.id}
          story={story}
          onPress={() => handlePress(story)}
          onDelete={() => deleteStory(story.id)}
        />
      ))}

      {data?.length === 0 && <Text>Henüz hikaye yok</Text>}
    </Screen>
  );
};

export default EvolutionList;
