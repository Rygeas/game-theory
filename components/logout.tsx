import { supabase } from "@/utils/supabase";
import { Button } from "react-native-paper";

async function onSignOutButtonPress() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
  }
}
export default function SignOutButton() {
  return <Button onPress={onSignOutButtonPress}>Çıkış Yap</Button>;
}
