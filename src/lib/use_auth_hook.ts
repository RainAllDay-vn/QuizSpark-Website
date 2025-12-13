import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged, signOut, type User} from "firebase/auth";
import {app} from "../firebase";
import {getUserInfo} from "@/lib/api.ts";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios";

// Extended user type that includes userId
interface ExtendedUser extends User {
  username: string;
  userId: string;
}

export default function useAuthStatus() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [user, setUser] = useState<ExtendedUser | null>(auth.currentUser as ExtendedUser | null);
  const [loading, setLoading] = useState(!auth.currentUser);

  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userInfo = await getUserInfo();
          const extendedUser: ExtendedUser = {
            ...currentUser,
            username: userInfo.username,
            userId: userInfo.id,
          };
          setUser(extendedUser);
        } catch (err: unknown) {
          if (err instanceof AxiosError && err.status === 404){
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
