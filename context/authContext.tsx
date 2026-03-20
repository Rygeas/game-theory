import {
  createContext,
  useContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "@/utils/supabase";

type AuthData = {
  userId?: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
};

export const AuthContext = createContext<AuthData>({
  userId: undefined,
  isLoading: true,
  isLoggedIn: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [userId, setUserId] = useState<string | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChange her zaman ilk session'ı da tetikler
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session?.user?.id);
      setUserId(session?.user?.id ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isLoggedIn = !!userId;

  const value = useMemo(
    () => ({ userId, isLoading, isLoggedIn }),
    [userId, isLoading, isLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
