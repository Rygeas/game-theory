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
  email?: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
};

export const AuthContext = createContext<AuthData>({
  userId: undefined,
  email: undefined,
  isLoading: true,
  isLoggedIn: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [userId, setUserId] = useState<string | null | undefined>(undefined);
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
      setEmail(session?.user?.email ?? null);
      setIsLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const isLoggedIn = !!userId;

  const value = useMemo(
    () => ({ userId, email, isLoading, isLoggedIn }),
    [userId, email, isLoading, isLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
