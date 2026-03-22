import React, { useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Text, Avatar, Button, Menu, Divider } from "react-native-paper";
import { useAuth } from "@/context/authContext";
import { Screen } from "@/components/Screen";
import { AppTheme } from "@/constants/theme";
import SignOutButton from "@/components/logout";
import { useTranslation } from "react-i18next";
import { changeLanguage, LANGUAGES } from "@/constants/i18n";
import { useTheme } from "react-native-paper";

const Profile = () => {
  const { email } = useAuth();
  const theme = useTheme<AppTheme>();
  const { i18n } = useTranslation();
  const [menuVisible, setMenuVisible] = useState(false);
  const { t } = useTranslation();

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language);
  const { width } = useWindowDimensions();

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <View style={styles.avatarSection}>
          <Avatar.Icon
            size={72}
            icon="account"
            style={{ backgroundColor: theme.colors.surfaceContainerHigh }}
            color={theme.colors.onSurfaceVariant}
          />
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onSurface, marginTop: 12 }}
          >
            {email ?? "—"}
          </Text>

          <View style={{ width: "100%" }}>
            <Text variant="labelLarge">{t("profile.language")}</Text>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              contentStyle={{
                width: width - 32, // padding çıkar
                backgroundColor: theme.colors.surfaceContainerLowest,
              }}
              anchor={
                <Button
                  mode="outlined"
                  icon="translate"
                  style={[styles.langButton, { width: "100%" }]}
                  onPress={() => setMenuVisible(true)}
                >
                  {currentLang?.flag} {t("profile." + currentLang?.label)}
                </Button>
              }
            >
              {LANGUAGES.map((lang, index) => (
                <React.Fragment key={lang.code}>
                  <Menu.Item
                    trailingIcon={
                      i18n.language === lang.code
                        ? "radiobox-marked"
                        : "radiobox-blank"
                    }
                    onPress={() => {
                      changeLanguage(lang.code);
                      setMenuVisible(false);
                    }}
                    title={`${lang.flag}  ${t("profile." + lang.label)}`}
                    titleStyle={{
                      color: theme.colors.onSurface,
                      fontFamily: "Inter_500Medium",
                    }}
                    style={{
                      backgroundColor: theme.colors.surfaceContainerLowest,
                    }}
                  />
                  {index < LANGUAGES.length - 1 && (
                    <Divider
                      style={{ backgroundColor: "rgba(178,178,172,0.15)" }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Menu>
          </View>
        </View>

        <SignOutButton />
      </View>
    </Screen>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 24,
  },
  avatarSection: {
    alignItems: "center",
    marginTop: 32,
    gap: 10,
  },
  langButton: {
    marginTop: 4,
  },
});
