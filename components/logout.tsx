import { supabase } from "@/utils/supabase";
import { Button } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { AppTheme } from "@/constants/theme";
import { useTranslation } from "react-i18next";

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Error signing out:", error);
}

export default function SignOutButton() {
  const theme = useTheme<AppTheme>();
  const { t } = useTranslation();

  return (
    <Button
      mode="outlined"
      onPress={signOut}
      contentStyle={{ paddingVertical: 6 }}
      style={{ borderRadius: 100, borderColor: "rgba(167, 59, 33, 0.3)" }}
      textColor={theme.colors.error}
    >
      {t("profile.signOut")}
    </Button>
  );
}
