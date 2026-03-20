import React, { useLayoutEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, Card, Divider, List, Button } from "react-native-paper";
import { router } from "expo-router";
import { Screen } from "@/components/Screen";
import Loading from "@/components/Loading";
import { useAnalysis } from "@/hooks/api/useAnaliysis";
import { usePromise } from "@/context/evolationContext";
import { useNavigation } from "expo-router";

const GameTheoryParse = () => {
  const { draft, clear } = usePromise();
  const navigation = useNavigation();

  const {
    data: analysis,
    isLoading,
    error,
    refetch,
  } = useAnalysis(draft?.storyId, draft?.userText);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => router.back()} style={{ marginLeft: 16 }}>
          <Text style={{ color: "#007AFF" }}>Geri</Text>
        </Pressable>
      ),
    });
  }, [draft?.storyId]);

  if (!draft) {
    return (
      <Screen>
        <Text>Gösterilecek veri yok.</Text>
        <Button mode="contained" onPress={() => router.replace("/home")}>
          Geri dön
        </Button>
      </Screen>
    );
  }

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <Screen>
        <Text style={styles.errorText}>Analiz oluşturulamadı.</Text>
        <Button mode="contained" onPress={() => refetch()}>
          Tekrar Dene
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.replace("/home")}
          style={{ marginTop: 8 }}
        >
          Geri Dön
        </Button>
      </Screen>
    );
  }

  if (!analysis) return null;

  return (
    <Screen scroll>
      <Card style={styles.card}>
        <Card.Title title="Amaç" />
        <Card.Content>
          <Text>{analysis.payoffs_preferences.objective}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Oyuncular" />
        <Card.Content>
          {analysis.players.map((p, i) => (
            <Text key={i}>• {p}</Text>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Stratejiler" />
        <Card.Content>
          {analysis.strategies.map((s, i) => (
            <View key={i} style={{ marginBottom: 12 }}>
              <Text variant="titleMedium">{s.player}</Text>
              {s.options.map((opt, j) => (
                <Text key={j}>– {opt}</Text>
              ))}
              {i < analysis.strategies.length - 1 && (
                <Divider style={{ marginTop: 8 }} />
              )}
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title
          title="Denge Noktası"
          subtitle={
            analysis.equilibrium.is_stable ? "✅ Kararlı" : "⚠️ Kararsız"
          }
        />
        <Card.Content>
          <Text>{analysis.equilibrium.description}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Değerlendirme" />
        <Card.Content>
          <Text selectable>{analysis.evaluation}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Öneriler" />
        <Card.Content>
          {analysis.recommendations.map((r, i) => (
            <View key={i} style={{ marginBottom: 12 }}>
              <Text variant="titleMedium">→ {r.action}</Text>
              <Text style={styles.reasoningText}>{r.reasoning}</Text>
              <Text style={styles.riskText}>⚠️ {r.risk}</Text>
              {i < analysis.recommendations.length - 1 && (
                <Divider style={{ marginTop: 8 }} />
              )}
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Öncelikler" />
        <Card.Content>
          {analysis.payoffs_preferences.ranking.map((r, i) => (
            <List.Item
              key={i}
              title={r}
              left={(props) => (
                <List.Icon {...props} icon="check-circle-outline" />
              )}
            />
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Eksik Bilgiler" />
        <Card.Content>
          {analysis.missing_info_questions.map((q, i) => (
            <Text key={i}>• {q.question}</Text>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Varsayımlar" />
        <Card.Content>
          {analysis.assumptions.map((a, i) => (
            <Text key={i}>• {a}</Text>
          ))}
        </Card.Content>
      </Card>

      <View style={{ gap: 10, marginBottom: 24 }}>
        <Button mode="contained" onPress={() => router.back()}>
          Geri Dön
        </Button>
      </View>
    </Screen>
  );
};

export default GameTheoryParse;

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  errorText: { marginBottom: 16, color: "red" },
  reasoningText: { opacity: 0.8, marginTop: 4 },
  riskText: { opacity: 0.6, marginTop: 4, fontStyle: "italic" },
});
