// app/(protected)/list/[storyId]/versions.tsx

import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";
import { Screen } from "@/components/Screen";
import Loading from "@/components/Loading";
import { useVersions } from "@/hooks/api/useVersions";

const VersionsList = () => {
  const { storyId } = useLocalSearchParams<{ storyId: string }>();
  const { data: versions, isLoading, error, refetch } = useVersions(storyId);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <Screen>
        <Text style={styles.errorText}>Versiyonlar yüklenemedi.</Text>
        <Button mode="contained" onPress={() => refetch()}>
          Tekrar Dene
        </Button>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      {versions?.map((item) => (
        <Pressable
          key={item.versionNumber}
          onPress={() =>
            router.push(
              `/(protected)/list/${storyId}/versions/${item.versionNumber}`,
            )
          }
        >
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.header}>
                <Text variant="titleMedium" style={styles.version}>
                  Gelişme {item.versionNumber}
                </Text>
                <Text style={styles.date}>
                  {new Date(item.createdAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                  })}
                </Text>
              </View>
              <Text numberOfLines={3} style={styles.entryText}>
                {item.entryText}
              </Text>
              {!item.analysis && (
                <Text style={styles.noAnalysis}>Analiz bulunamadı</Text>
              )}
            </Card.Content>
          </Card>
        </Pressable>
      ))}

      {versions?.length === 0 && (
        <Text style={styles.empty}>Henüz gelişme yok</Text>
      )}
    </Screen>
  );
};

export default VersionsList;

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  version: { fontWeight: "bold" },
  date: { fontSize: 12, opacity: 0.6 },
  entryText: { opacity: 0.8, fontSize: 14 },
  noAnalysis: { color: "orange", marginTop: 6, fontSize: 12 },
  empty: { textAlign: "center", marginTop: 40, opacity: 0.6 },
  errorText: { marginBottom: 16, color: "red" },
});
