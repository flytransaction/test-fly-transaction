"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, User } from "./auth";

export function useAuthGuard(requiredRole?: "user" | "admin") {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      router.replace("/login");
      return;
    }
    if (requiredRole && u.role !== requiredRole && u.role !== "admin") {
      router.replace("/dashboard");
      return;
    }
    setUser(u);
    setReady(true);
  }, [router, requiredRole]);

  return { user, ready };
}