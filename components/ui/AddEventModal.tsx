import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { TextInput } from "react-native";

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
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
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
            Ne oldu?
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            Yeni bir gelişme veya düşünceni yaz, analiz güncellenecek.
          </Text>

          <TextInput
            placeholder="Bugün şunu fark ettim..."
            placeholderTextColor="#aaa"
            value={text}
            onChangeText={setText}
            multiline
            style={styles.input}
            textAlignVertical="top"
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={!text.trim() || isLoading}
            contentStyle={{ paddingVertical: 6 }}
            style={styles.submitButton}
          >
            Analizi Güncelle
          </Button>

          <Pressable onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Vazgeç</Text>
          </Pressable>
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
    backgroundColor: "#fff",
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
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    color: "#1A1A2E",
  },
  subtitle: {
    color: "#888",
    marginTop: -4,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: "#1A1A2E",
    height: 140,
    marginTop: 4,
  },
  submitButton: {
    borderRadius: 12,
    marginTop: 4,
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: 4,
  },
  cancelText: {
    color: "#888",
    fontSize: 14,
  },
});
