import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { useIsPremium } from "@/hooks/useIsPremium";
import { useAuth } from "@/context/authContext";
import { useStoryLimit } from "@/hooks/api/useStories";
import { router } from "expo-router";
import { theme } from "@/constants/theme";

type AddEventModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
  isLoading?: boolean;
};

const AddEventModal = ({
  visible,
  onClose,
  onSubmit,
  isLoading,
}: AddEventModalProps) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const { isPremium } = useIsPremium();
  const { userId } = useAuth();

  const { canCreate } = useStoryLimit(isPremium, userId!);

  const handleSubmit = () => {
    if (!text.trim()) return;
    if (!canCreate) {
      router.push("/paywall");
      return;
    }
    onSubmit(text.trim());
    setText("");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <Text variant="titleLarge" style={styles.title}>
            {t("modal.title")}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            {t("modal.subtitle")}
          </Text>

          <TextInput
            placeholder={t("modal.placeholder")}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            value={text}
            onChangeText={setText}
            multiline
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.surfaceContainerLow,
                color: theme.colors.onBackground,
              },
            ]}
            textAlignVertical="top"
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={!text.trim() || isLoading}
            contentStyle={{ paddingVertical: 6 }}
            style={styles.submitButton}
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
          >
            {t("modal.submit")}
          </Button>

          <Button
            onPress={onClose}
            mode="outlined"
            style={styles.cancelButton}
            contentStyle={{ paddingVertical: 4 }}
            textColor={theme.colors.onSurfaceVariant}
          >
            {t("modal.cancel")}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddEventModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  sheet: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 48,
    gap: 12,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: theme.colors.surfaceContainerHigh,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    color: theme.colors.onBackground,
  },
  subtitle: {
    color: theme.colors.onSurfaceVariant,
    marginTop: -4,
  },
  input: {
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    height: 140,
    marginTop: 4,
  },
  submitButton: {
    borderRadius: 12,
    marginTop: 4,
  },
  cancelButton: {
    borderRadius: 12,
  },
});
