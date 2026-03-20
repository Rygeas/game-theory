import { Pressable, StyleSheet, Text } from "react-native";
import { Drawer } from "expo-router/drawer";
import { PromiseProvider } from "@/context/evolationContext";

const MainLayout = () => {
  return (
    <PromiseProvider>
      <Drawer>
        <Drawer.Screen name="home/index" options={{ title: "Ana Sayfa" }} />
        <Drawer.Screen name="list/index" options={{ title: "Hikayelerim" }} />
        <Drawer.Screen name="profile/index" options={{ title: "Profil" }} />

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
          options={{
            drawerItemStyle: { display: "none" },
            headerShown: false,
          }}
        />
      </Drawer>
    </PromiseProvider>
  );
};

export default MainLayout;

const styles = StyleSheet.create({});
