import { useRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "react-native-paper";
import { AppTheme } from "@/constants/theme";

export default function Loading() {
  const animation = useRef<LottieView>(null);
  const theme = useTheme<AppTheme>();

  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <LottieView
        autoPlay
        ref={animation}
        style={styles.animation}
        source={require("../assets/images/loading.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: 200,
    height: 200,
  },
});
