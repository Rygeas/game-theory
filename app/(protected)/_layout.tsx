import { Pressable, StyleSheet } from "react-native";
import { Drawer } from "expo-router/drawer";
import { PromiseProvider } from "@/context/evolationContext";
import { useTheme } from "react-native-paper";
import { AppTheme } from "@/constants/theme";
import { useTranslation } from "react-i18next";

const MainLayout = () => {
  const theme = useTheme<AppTheme>();
  const { t } = useTranslation();

  return (
    <PromiseProvider>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary, // #516452 yeşil
          },
          headerTintColor: "#ffffff", // üzerindeki yazı ve ikonlar beyaz
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Manrope_600SemiBold",
            color: "#ffffff",
          },
          drawerStyle: {
            backgroundColor: theme.colors.surfaceContainerLow,
          },
          drawerActiveTintColor: theme.colors.primary,
          drawerInactiveTintColor: theme.colors.onSurfaceVariant,
          drawerLabelStyle: {
            fontFamily: "Inter_500Medium",
            fontSize: 15,
          },
        }}
      >
        <Drawer.Screen
          name="home/index"
          options={{ title: t("drawer.home") }}
        />
        <Drawer.Screen
          name="list/index"
          options={{ title: t("drawer.stories") }}
        />
        <Drawer.Screen
          name="profile/index"
          options={{ title: t("drawer.profile") }}
        />

        <Drawer.Screen
          name="home/GameTheoryParse"
          options={{ drawerItemStyle: { display: "none" }, title: "" }}
        />
        <Drawer.Screen
          name="list/[storyId]"
          options={{ drawerItemStyle: { display: "none" }, headerShown: false }}
        />
        <Drawer.Screen
          name="index"
          options={{ drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="home/(parse)"
          options={{ drawerItemStyle: { display: "none" }, headerShown: false }}
        />
      </Drawer>
    </PromiseProvider>
  );
};

export default MainLayout;

const styles = StyleSheet.create({});
