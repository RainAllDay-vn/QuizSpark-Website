import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged, signOut, type User} from "firebase/auth";
import {app} from "../firebase";
import {getUserInfo} from "@/lib/api.ts";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios";

export default function useAuthStatus() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(!auth.currentUser);

  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          await getUserInfo();
          setUser(currentUser);
        } catch (err: unknown) {
          if (err instanceof AxiosError && err.status === 400){
            navigate('/additional-info');
          } else {
            await signOut(auth);
            alert("An error has occurred!")
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, [auth, navigate]);

  return { user, loading };
}
