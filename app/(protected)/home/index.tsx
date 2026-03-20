import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Screen } from "@/components/Screen";
import { router } from "expo-router";
import { usePromise } from "../../../context/evolationContext";
import { useAuth } from "@/context/authContext";
import { useCreateStory } from "@/hooks/api/useStories";

const Home = () => {
  const { userId } = useAuth();
  const { setDraft } = usePromise();
  const { mutate: createStory, isPending } = useCreateStory();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: "",
      story: "",
    },
  });

  const onSubmit = (form: { story: string; title: string }) => {
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
    <Screen scroll={true}>
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="Başlık"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        control={control}
        name="story"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="Hikayeni anlat..."
            value={value}
            multiline
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        mode="contained"
        loading={isPending}
      >
        Gönder
      </Button>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({});
