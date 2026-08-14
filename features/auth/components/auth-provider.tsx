"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/shared/lib/firebase-client";
import { useAuthStore } from "@/features/auth/store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUser(null, false);
        return;
      }
      const tokenResult = await user.getIdTokenResult();
      setUser(user, tokenResult.claims.admin === true);
    });
    return unsubscribe;
  }, [setUser]);

  return <>{children}</>;
}
