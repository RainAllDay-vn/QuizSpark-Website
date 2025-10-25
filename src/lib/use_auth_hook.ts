import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged, type User} from "firebase/auth";
import {app} from "../firebase";

export default function useAuthStatus() {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(!auth.currentUser);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, [auth]);

  return { user, loading };
}
