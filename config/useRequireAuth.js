import { useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useRouter } from "next/router";

export const useRequireAuth = (redirectUrl = "/auth/login") => {
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(redirectUrl);
    }
  }, [user, router]);

  return { user };
};
