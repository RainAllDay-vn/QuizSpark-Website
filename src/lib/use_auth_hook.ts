import { useCallback, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, type User } from "firebase/auth";
import { app } from "../firebase";
import { getUserInfo } from "@/lib/api.ts";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { userCache, type ExtendedUser } from "@/lib/userCache.ts";

export default function useAuthStatus() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [user, setUser] = useState<ExtendedUser | null>(userCache.get());
  const [loading, setLoading] = useState(!userCache.get() || userCache.isDirty());

  const fetchUserInfo = useCallback(async (currentUser: User) => {
    // If not dirty and we have data, just return
    if (!userCache.isDirty() && userCache.get()) {
      setUser(userCache.get());
      setLoading(false);
      return;
    }

    try {
      const userInfo = await getUserInfo();
      const extendedUser: ExtendedUser = {
        ...currentUser,
        username: userInfo.username,
        userId: userInfo.id,
        role: userInfo.role,
      };
      userCache.set(extendedUser);
      setUser(extendedUser);
    } catch (err: unknown) {
      if (err instanceof AxiosError && (err.status === 404 || err.response?.status === 404)) {
        navigate('/additional-info');
      } else {
        await signOut(auth);
        userCache.clear();
        alert("An error has occurred!");
      }
    } finally {
      setLoading(false);
    }
  }, [auth, navigate]);

  const refetch = useCallback(() => {
    userCache.markDirty();
    if (auth.currentUser) {
      setLoading(true);
      fetchUserInfo(auth.currentUser);
    }
  }, [auth, fetchUserInfo]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await fetchUserInfo(currentUser);
      } else {
        userCache.clear();
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, fetchUserInfo]);

  return { user, loading, refetch };
}
