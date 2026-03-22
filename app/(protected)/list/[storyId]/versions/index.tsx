import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";
import { Screen } from "@/components/Screen";
import Loading from "@/components/Loading";
import { useVersions } from "@/hooks/api/useVersions";
import { useTheme } from "react-native-paper";
import { AppTheme } from "@/constants/theme";
import { useTranslation } from "react-i18next";

const VersionsList = () => {
  const { storyId } = useLocalSearchParams<{ storyId: string }>();
  const { data: versions, isLoading, error, refetch } = useVersions(storyId);
  const theme = useTheme<AppTheme>();
  const { t, i18n } = useTranslation();

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <Screen>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.error, marginBottom: 16 }}
        >
          {t("versions.error")}
        </Text>
        <Button
          mode="contained"
          onPress={() => refetch()}
          style={styles.button}
        >
          {t("common.retry")}
        </Button>
      </Screen>
    );
  }

  return (
    <Screen scroll onRefresh={refetch} refreshing={isLoading}>
      {versions?.map((item) => (
        <Pressable
          key={item.versionNumber}
          onPress={() =>
            router.push(
              `/(protected)/list/${storyId}/versions/${item.versionNumber}`,
            )
          }
        >
          <Card
            style={[
              styles.card,
              { backgroundColor: theme.colors.surfaceContainerLowest },
            ]}
          >
            <Card.Content>
              <View style={styles.header}>
                <Text
                  variant="titleSmall"
                  style={{
                    fontFamily: "Manrope_600SemiBold",
                    color: theme.colors.onSurface,
                  }}
                >
                  {t("versions.development")} {item.versionNumber}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {new Date(item.createdAt).toLocaleDateString(
                    i18n.language === "tr" ? "tr-TR" : "en-US",
                    { day: "numeric", month: "long" },
                  )}
                </Text>
              </View>
              <Text
                numberOfLines={3}
                variant="bodySmall"
                style={{ color: theme.colors.onSurfaceVariant, lineHeight: 20 }}
              >
                {item.entryText}
              </Text>
              {!item.analysis && (
                <Text
                  variant="labelSmall"
                  style={{ color: theme.colors.secondary, marginTop: 8 }}
                >
                  {t("versions.noAnalysis")}
                </Text>
              )}
            </Card.Content>
          </Card>
        </Pressable>
      ))}

      {versions?.length === 0 && (
        <View style={styles.emptyState}>
          <Text
            variant="bodyMedium"
            style={{
              color: theme.colors.onSurfaceVariant,
              textAlign: "center",
            }}
          >
            {t("versions.empty")}
          </Text>
        </View>
      )}
    </Screen>
  );
};

export default VersionsList;

const styles = StyleSheet.create({
  card: { marginBottom: 10, borderRadius: 16, elevation: 0 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  button: { borderRadius: 100 },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },
});
