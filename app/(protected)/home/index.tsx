import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Screen } from "@/components/Screen";
import { router } from "expo-router";
import { usePromise } from "../../../context/evolationContext";
import { useAuth } from "@/context/authContext";
import { useCreateStory, useStoryLimit } from "@/hooks/api/useStories";
import { useTheme } from "react-native-paper";
import { AppTheme } from "@/constants/theme";
import { useTranslation } from "react-i18next";
import { useIsPremium } from "@/hooks/useIsPremium";

const Home = () => {
  const { setDraft } = usePromise();
  const { mutate: createStory, isPending } = useCreateStory();
  const theme = useTheme<AppTheme>();
  const { t } = useTranslation();
  const { isPremium } = useIsPremium();
  const { userId } = useAuth();

  const { canCreate, remaining } = useStoryLimit(isPremium, userId!);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: { title: "", story: "" },
  });

  const onSubmit = (form: { story: string; title: string }) => {
    if (!canCreate) {
      console.log("çalıştım");

      router.push("/paywall");
      return;
    }
    createStory(
      { userId: userId!, title: form.title, story: form.story },
      {
        onSuccess: ({ storyId }) => {
          setDraft({ storyId, userText: form.story });
          router.push("/(protected)/home/(parse)/GameTheoryParse");
          reset();
        },
        onError: (err) => console.error("onSubmit error:", err),
      },
    );
  };

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        {/* Başlık */}
        <View style={styles.header}>
          <Text
            variant="headlineSmall"
            style={{
              fontFamily: "Manrope_600SemiBold",
              color: theme.colors.onSurface,
            }}
          >
            {t("home.title")}
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
          >
            {t("home.subtitle")}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                placeholder={t("home.titlePlaceholder")}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                mode="outlined"
                outlineStyle={{
                  borderRadius: 12,
                  borderColor: "rgba(178,178,172,0.3)",
                }}
                style={{ backgroundColor: theme.colors.surfaceContainerLowest }}
              />
            )}
          />

          <Controller
            control={control}
            name="story"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                placeholder={t("home.storyPlaceholder")}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                mode="outlined"
                multiline
                numberOfLines={10}
                outlineStyle={{
                  borderRadius: 12,
                  borderColor: "rgba(178,178,172,0.3)",
                }}
                style={[
                  styles.storyInput,
                  { backgroundColor: theme.colors.surfaceContainerLowest },
                ]}
              />
            )}
          />
        </View>

        {/* Gönder */}
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          loading={isPending}
          disabled={isPending}
          style={styles.button}
          contentStyle={{ paddingVertical: 8 }}
          labelStyle={{ fontFamily: "Inter_500Medium", fontSize: 15 }}
        >
          {t("home.submit")}
        </Button>
      </View>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  header: {
    marginBottom: 24,
  },
  form: {
    flex: 1,
    gap: 12,
  },
  storyInput: {
    flex: 1,
    minHeight: 200,
  },
  button: {
    borderRadius: 100,
    marginTop: 16,
  },
});
