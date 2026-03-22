import React, { useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, Card, Divider, List, Button } from "react-native-paper";
import { router, useNavigation } from "expo-router";
import { Screen } from "@/components/Screen";
import Loading from "@/components/Loading";
import { useAnalysis } from "@/hooks/api/useAnaliysis";
import { usePromise } from "@/context/evolationContext";
import { useTheme } from "react-native-paper";
import { AppTheme } from "@/constants/theme";
import AddEventModal from "@/components/ui/AddEventModal";
import { useAddEntry } from "@/hooks/api/useAddEntry";

const GameTheoryParse = () => {
  const { draft } = usePromise();
  const navigation = useNavigation();
  const theme = useTheme<AppTheme>();
  const [modalVisible, setModalVisible] = useState(false);
  const entryMutation = useAddEntry(draft?.storyId ?? "");

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
          <Text
            style={{
              color: theme.colors.primary,
              fontFamily: "Inter_500Medium",
            }}
          >
            Geri
          </Text>
        </Pressable>
      ),
    });
  }, [draft?.storyId]);

  if (!draft) {
    return (
      <Screen>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}
        >
          Gösterilecek veri yok.
        </Text>
        <Button
          mode="contained"
          onPress={() => router.replace("/home")}
          style={styles.button}
        >
          Geri Dön
        </Button>
      </Screen>
    );
  }

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <Screen>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.error, marginBottom: 16 }}
        >
          Analiz oluşturulamadı.
        </Text>
        <Button
          mode="contained"
          onPress={() => refetch()}
          style={styles.button}
        >
          Tekrar Dene
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.replace("/home")}
          style={[styles.button, { marginTop: 8 }]}
        >
          Geri Dön
        </Button>
      </Screen>
    );
  }

  if (!analysis) return null;

  const cardStyle = [
    styles.card,
    { backgroundColor: theme.colors.surfaceContainerLowest },
  ];
  const titleStyle = {
    fontFamily: "Manrope_600SemiBold",
    color: theme.colors.onSurface,
  };

  return (
    <Screen scroll>
      <Card style={cardStyle}>
        <Card.Title
          title="Amaç"
          titleVariant="titleMedium"
          titleStyle={titleStyle}
        />
        <Card.Content>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            {analysis.payoffs_preferences.objective}
          </Text>
        </Card.Content>
      </Card>

      <Card style={cardStyle}>
        <Card.Title
          title="Oyuncular"
          titleVariant="titleMedium"
          titleStyle={titleStyle}
        />
        <Card.Content>
          {analysis.players.map((p, i) => (
            <Text
              key={i}
              variant="bodyMedium"
              style={{ color: theme.colors.onSurface, marginBottom: 4 }}
            >
              · {p}
            </Text>
          ))}
        </Card.Content>
      </Card>

      <Card style={cardStyle}>
        <Card.Title
          title="Stratejiler"
          titleVariant="titleMedium"
          titleStyle={titleStyle}
        />
        <Card.Content>
          {analysis.strategies.map((s, i) => (
            <View key={i} style={{ marginBottom: 12 }}>
              <Text
                variant="titleSmall"
                style={{
                  color: theme.colors.primary,
                  marginBottom: 4,
                  fontFamily: "Inter_600SemiBold",
                }}
              >
                {s.player}
              </Text>
              {s.options.map((opt, j) => (
                <Text
                  key={j}
                  variant="bodyMedium"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginBottom: 2,
                  }}
                >
                  – {opt}
                </Text>
              ))}
              {i < analysis.strategies.length - 1 && (
                <Divider
                  style={{
                    marginTop: 10,
                    backgroundColor: "rgba(178,178,172,0.15)",
                  }}
                />
              )}
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={cardStyle}>
        <Card.Title
          title="Denge Noktası"
          titleVariant="titleMedium"
          titleStyle={titleStyle}
          subtitle={
            analysis.equilibrium.is_stable ? "✅ Kararlı" : "⚠️ Kararsız"
          }
          subtitleStyle={{ color: theme.colors.onSurfaceVariant, fontSize: 13 }}
        />
        <Card.Content>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            {analysis.equilibrium.description}
          </Text>
        </Card.Content>
      </Card>

      <Card style={cardStyle}>
        <Card.Title
          title="Değerlendirme"
          titleVariant="titleMedium"
          titleStyle={titleStyle}
        />
        <Card.Content>
          <Text
            selectable
            variant="bodyMedium"
            style={{ color: theme.colors.onSurface, lineHeight: 24 }}
          >
            {analysis.evaluation}
          </Text>
        </Card.Content>
      </Card>

      <Card style={cardStyle}>
        <Card.Title
          title="Öneriler"
          titleVariant="titleMedium"
          titleStyle={titleStyle}
        />
        <Card.Content>
          {analysis.recommendations.map((r, i) => (
            <View key={i} style={{ marginBottom: 12 }}>
              <Text
                variant="titleSmall"
                style={{
                  color: theme.colors.onSurface,
                  fontFamily: "Inter_600SemiBold",
                  marginBottom: 4,
                }}
              >
                → {r.action}
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginBottom: 4,
                  lineHeight: 20,
                }}
              >
                {r.reasoning}
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  fontStyle: "italic",
                  opacity: 0.7,
                }}
              >
                ⚠️ {r.risk}
              </Text>
              {i < analysis.recommendations.length - 1 && (
                <Divider
                  style={{
                    marginTop: 10,
                    backgroundColor: "rgba(178,178,172,0.15)",
                  }}
                />
              )}
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={cardStyle}>
        <Card.Title
          title="Öncelikler"
          titleVariant="titleMedium"
          titleStyle={titleStyle}
        />
        <Card.Content>
          {analysis.payoffs_preferences.ranking.map((r, i) => (
            <List.Item
              key={i}
              title={r}
              titleStyle={{
                color: theme.colors.onSurface,
                fontFamily: "Inter_400Regular",
                fontSize: 14,
              }}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="check-circle-outline"
                  color={theme.colors.primary}
                />
              )}
              style={{ paddingLeft: 0 }}
            />
          ))}
        </Card.Content>
      </Card>

      <Card style={cardStyle}>
        <Card.Title
          title="Eksik Bilgiler"
          titleVariant="titleMedium"
          titleStyle={titleStyle}
        />
        <Card.Content>
          {analysis.missing_info_questions.map((q, i) => (
            <Text
              key={i}
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant, marginBottom: 6 }}
            >
              · {q.question}
            </Text>
          ))}
        </Card.Content>
      </Card>

      <Card style={cardStyle}>
        <Card.Title
          title="Varsayımlar"
          titleVariant="titleMedium"
          titleStyle={titleStyle}
        />
        <Card.Content>
          {analysis.assumptions.map((a, i) => (
            <Text
              key={i}
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant, marginBottom: 6 }}
            >
              · {a}
            </Text>
          ))}
        </Card.Content>
      </Card>

      <View style={{ gap: 10, marginBottom: 24 }}>
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={styles.button}
          contentStyle={{ paddingVertical: 6 }}
        >
          Ana Sayfaya Dön
        </Button>
        <Button
          mode="outlined"
          onPress={() => setModalVisible(true)}
          style={styles.button}
          contentStyle={{ paddingVertical: 6 }}
        >
          + Yeni Gelişme Ekle
        </Button>
      </View>

      <AddEventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={(text) => {
          entryMutation.mutate(text, {
            onSuccess: () => setModalVisible(false),
          });
        }}
        isLoading={entryMutation.isPending}
      />
    </Screen>
  );
};

export default GameTheoryParse;

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 0,
  },
  button: {
    borderRadius: 100,
  },
});
