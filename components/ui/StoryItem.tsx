import { Story } from "@/services/story";
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
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10,
      onPanResponderMove: (_, { dx }) => {
        if (dx < 0) translateX.setValue(Math.max(dx, -DELETE_WIDTH));
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx < SWIPE_THRESHOLD) {
          Animated.spring(translateX, {
            toValue: -DELETE_WIDTH,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View style={styles.itemContainer}>
      {/* Silme butonu arkada */}
      <Pressable style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>Sil</Text>
      </Pressable>

      {/* Kaydırılabilir kart */}
      <Animated.View
        style={[styles.card, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <Pressable onPress={onPress} style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.title} numberOfLines={1}>
              {story.title}
            </Text>
            <View
              style={[
                styles.statusBadge,
                story.status === "active"
                  ? styles.statusActive
                  : styles.statusCompleted,
              ]}
            >
              <Text style={styles.statusText}>
                {story.status === "active" ? "Devam Ediyor" : "Tamamlandı"}
              </Text>
            </View>
          </View>
          <Text style={styles.date}>
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
  container: { flex: 1, padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { textAlign: "center", marginTop: 40, opacity: 0.6 },
  itemContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 64,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  deleteText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardContent: { padding: 16 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: { fontSize: 16, fontWeight: "bold", flex: 1, marginRight: 8 },
  date: { fontSize: 12, opacity: 0.6 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusActive: { backgroundColor: "#E8F5E9" },
  statusCompleted: { backgroundColor: "#F3F4F6" },
  statusText: { fontSize: 11, fontWeight: "600" },
});
