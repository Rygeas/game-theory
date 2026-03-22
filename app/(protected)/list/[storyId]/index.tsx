import { Pressable, StyleSheet, View } from "react-native";
import { Text, Card, Divider, List, Button } from "react-native-paper";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, router, useNavigation } from "expo-router";
import { Screen } from "@/components/Screen";
import Loading from "@/components/Loading";
import { useAnalysisDetail } from "@/hooks/api/useAnaliysis";
import AddEventModal from "@/components/ui/AddEventModal";
import { useAddEntry } from "@/hooks/api/useAddEntry";
import { useTheme } from "react-native-paper";
import { AppTheme } from "@/constants/theme";
import { useTranslation } from "react-i18next";

const StoryDetail = () => {
  const { storyId } = useLocalSearchParams<{ storyId: string }>();
  const [modalVisible, setModalVisible] = useState(false);
  const entryMutation = useAddEntry(storyId);
  const navigation = useNavigation();
  const theme = useTheme<AppTheme>();
  const { t } = useTranslation();

  const {
    data: analysis,
    isLoading,
    error,
    refetch,
  } = useAnalysisDetail(storyId);

  const handleEntry = (text: string) => {
    entryMutation.mutateAsync(text, {
      onSuccess() {
        setModalVisible(false);
      },
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => router.push("/(protected)/list")}
          style={{ marginLeft: 16 }}
        >
          <Text
            style={{
              color: theme.colors.onPrimary,
              fontFamily: "Inter_500Medium",
            }}
          >
            {t("common.goBack")}
          </Text>
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          onPress={() => router.push(`/(protected)/list/${storyId}/versions`)}
          style={{ marginRight: 16 }}
        >
          <Text
            style={{
              color: theme.colors.onPrimary,
              fontFamily: "Inter_500Medium",
            }}
          >
            {t("common.history")}
          </Text>
        </Pressable>
      ),
    });
  }, [storyId, t]);

  if (isLoading || entryMutation.isPending) return <Loading />;

  if (error) {
    return (
      <Screen>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.error, marginBottom: 16 }}
        >
          {t("versions.analysisError")}
        </Text>
        <Button
          mode="contained"
          onPress={() => refetch()}
          style={styles.button}
        >
          {t("common.retry")}
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.back()}
          style={[styles.button, { marginTop: 8 }]}
        >
          {t("analysis.goBack")}
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
    <Screen scroll onRefresh={refetch} refreshing={isLoading}>
      <Card style={cardStyle}>
        <Card.Title
          title={t("analysis.objective")}
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
          title={t("analysis.players")}
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
          title={t("analysis.strategies")}
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
          title={t("analysis.equilibrium")}
          titleVariant="titleMedium"
          titleStyle={titleStyle}
          subtitle={
            analysis.equilibrium.is_stable
              ? t("analysis.stable")
              : t("analysis.unstable")
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
          title={t("analysis.evaluation")}
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
          title={t("analysis.recommendations")}
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
          title={t("analysis.priorities")}
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
          title={t("analysis.missingInfo")}
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
          title={t("analysis.assumptions")}
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
          {t("analysis.goBack")}
        </Button>
        <Button
          mode="outlined"
          onPress={() => setModalVisible(true)}
          style={styles.button}
          contentStyle={{ paddingVertical: 6 }}
        >
          {t("analysis.addDevelopment")}
        </Button>
      </View>

      <AddEventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={(text) => handleEntry(text)}
        isLoading={entryMutation.isPending}
      />
    </Screen>
  );
};

export default StoryDetail;

const styles = StyleSheet.create({
  card: { marginBottom: 12, borderRadius: 16, elevation: 0 },
  button: { borderRadius: 100 },
});
