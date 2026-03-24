import { supabase } from "@/utils/supabase";
import React, { useState, useRef } from "react";
import { Alert, Animated, StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { AppTheme } from "@/constants/theme";
import { useTranslation } from "react-i18next";
import { Screen } from "@/components/Screen";

export default function Auth() {
  const theme = useTheme<AppTheme>();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const switchMode = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 140,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();

    setIsSignUp((prev) => !prev);
  };

  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert(t("common.error"), t("auth.fillAllFields"));
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(t("common.error"), error.message);
    }

    setLoading(false);
  }

  async function signUpWithEmail() {
    if (!email || !password) {
      Alert.alert(t("common.error"), t("auth.fillAllFields"));
      return;
    }

    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert(t("common.error"), error.message);
    }

    if (!session) {
      Alert.alert(t("auth.checkEmail"));
    }

    setLoading(false);
  }

  const isEmailValid = email.length === 0 || /\S+@\S+\.\S+/.test(email);

  return (
    <Screen hasHeader={false}>
      <View style={styles.container}>
        <Surface
          elevation={1}
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surfaceContainerLow,
              borderColor: theme.colors.outline,
            },
          ]}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            <View style={styles.header}>
              <Surface
                elevation={0}
                style={[
                  styles.logoMark,
                  { backgroundColor: theme.colors.primaryContainer },
                ]}
              >
                <Text
                  variant="titleLarge"
                  style={{ color: theme.colors.onPrimaryContainer }}
                >
                  PM
                </Text>
              </Surface>

              <Text
                variant="headlineMedium"
                style={[styles.title, { color: theme.colors.onBackground }]}
              >
                {isSignUp ? t("auth.createAccount") : t("auth.welcomeBack")}
              </Text>

              <Text
                variant="bodyMedium"
                style={[
                  styles.subtitle,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                {isSignUp ? t("auth.signUpSubtitle") : t("auth.signInSubtitle")}
              </Text>
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: theme.colors.outlineVariant },
              ]}
            />

            <View style={styles.form}>
              <TextInput
                label={t("auth.email")}
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                placeholder={t("auth.emailPlaceholder")}
                left={<TextInput.Icon icon="email-outline" />}
                style={styles.input}
                outlineStyle={styles.inputOutline}
                contentStyle={[
                  styles.inputContent,
                  { color: theme.colors.onBackground },
                ]}
                theme={{
                  colors: {
                    primary: theme.colors.primary,
                    outline: theme.colors.outline,
                    onSurfaceVariant: theme.colors.onSurfaceVariant,
                    background: theme.colors.surfaceContainerLowest,
                  },
                }}
              />
              <HelperText type="error" visible={!isEmailValid}>
                {t("auth.invalidEmail")}
              </HelperText>

              <TextInput
                label={t("auth.password")}
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                autoComplete="password"
                placeholder={t("auth.passwordPlaceholder")}
                left={<TextInput.Icon icon="lock-outline" />}
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? "eye-off-outline" : "eye-outline"}
                    onPress={() => setPasswordVisible((prev) => !prev)}
                  />
                }
                style={styles.input}
                outlineStyle={styles.inputOutline}
                contentStyle={[
                  styles.inputContent,
                  { color: theme.colors.onBackground },
                ]}
                theme={{
                  colors: {
                    primary: theme.colors.primary,
                    outline: theme.colors.outline,
                    onSurfaceVariant: theme.colors.onSurfaceVariant,
                    background: theme.colors.surfaceContainerLowest,
                  },
                }}
              />

              <Button
                mode="contained"
                onPress={isSignUp ? signUpWithEmail : signInWithEmail}
                loading={loading}
                disabled={loading}
                style={styles.primaryButton}
                contentStyle={styles.primaryButtonContent}
                labelStyle={styles.primaryButtonLabel}
                buttonColor={theme.colors.primary}
                textColor={theme.colors.onPrimary}
              >
                {isSignUp ? t("auth.signUp") : t("auth.signIn")}
              </Button>
            </View>

            <View style={styles.switchRow}>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                {isSignUp ? t("auth.hasAccount") : t("auth.noAccount")}
              </Text>

              <Button
                compact
                mode="text"
                onPress={switchMode}
                textColor={theme.colors.primary}
                labelStyle={styles.switchButtonLabel}
              >
                {isSignUp ? t("auth.switchToSignIn") : t("auth.switchToSignUp")}
              </Button>
            </View>
          </Animated.View>
        </Surface>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 24,
  },
  topAccent: {
    height: 5,
    width: 56,
    borderRadius: 999,
    alignSelf: "center",
    marginBottom: 28,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 22,
  },
  logoMark: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
  },
  divider: {
    height: 1,
    marginBottom: 22,
  },
  form: {
    gap: 4,
  },
  input: {
    marginBottom: 2,
  },
  inputOutline: {
    borderRadius: 16,
  },
  inputContent: {
    fontSize: 15,
  },
  primaryButton: {
    marginTop: 14,
    borderRadius: 14,
  },
  primaryButtonContent: {
    height: 52,
  },
  primaryButtonLabel: {
    fontSize: 16,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  switchButtonLabel: {
    fontSize: 14,
  },
});
