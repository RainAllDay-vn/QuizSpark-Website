import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged, type User} from "firebase/auth";
import {app} from "../firebase";
import {getUserInfo} from "@/lib/api.ts";
import {useNavigate} from "react-router-dom";

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
          navigate('/home')
        } catch {
          navigate('/additional-info');
        }
      } else {
        setUser(null);
        navigate('/')
      }
      setLoading(false);
    });
  }, [auth, navigate]);

  return { user, loading };
}
