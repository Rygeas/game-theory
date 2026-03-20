import { useAuth } from "@/context/authContext";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useAuth();
  console.log(isLoading, "------");

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
