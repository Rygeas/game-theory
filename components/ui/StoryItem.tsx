// StoryItem.tsx

import { Story } from "@/services/story";
import React, { useRef } from "react";
import {
  View,
  Pressable,
  Animated,
  PanResponder,
  StyleSheet,
} from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { AppTheme } from "@/constants/theme";
import { useTranslation } from "react-i18next";

const DELETE_WIDTH = 64;
const SWIPE_THRESHOLD = -64;

const StoryItem = ({
  story,
  onDelete,
  onPress,
}: {
  story: Story;
  onDelete: () => void;
  onPress: () => void;
}) => {
  const theme = useTheme<AppTheme>();
  const translateX = useRef(new Animated.Value(0)).current;
  const { t } = useTranslation();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10,
      onPanResponderMove: (_, { dx }) => {
        if (dx < 0) translateX.setValue(Math.max(dx, -DELETE_WIDTH));
      },
      onPanResponderRelease: (_, { dx }) => {
        Animated.spring(translateX, {
          toValue: dx < SWIPE_THRESHOLD ? -DELETE_WIDTH : 0,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  const isActive = story.status === "active";

  return (
    <View style={styles.itemContainer}>
      <Pressable style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>Sil</Text>
      </Pressable>

      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.surfaceContainerLowest,
          },
          { transform: [{ translateX }] },
        ]}
        {...panResponder.panHandlers}
      >
        <Pressable onPress={onPress} style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text
              variant="titleSmall"
              numberOfLines={1}
              style={[styles.title, { color: theme.colors.onSurface }]}
            >
              {story.title}
            </Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: isActive
                    ? "rgba(81, 100, 82, 0.12)"
                    : theme.colors.surfaceContainerHigh,
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color: isActive
                      ? theme.colors.primary
                      : theme.colors.onSurfaceVariant,
                  },
                ]}
              >
                {isActive ? t("list.ongoing") : t("list.completed")}
              </Text>
            </View>
          </View>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {new Date(story.created_at).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default StoryItem;

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: DELETE_WIDTH,
    backgroundColor: "#a73b21",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  deleteText: {
    color: "white",
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    letterSpacing: 0.3,
  },
  card: {
    borderRadius: 16,
  },
  cardContent: { padding: 16 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: { flex: 1, marginRight: 8 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
  },
});
