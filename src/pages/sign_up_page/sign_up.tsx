import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  getAuth,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';
import {app} from "../../firebase";
import LogInPanel from '@/pages/sign_up_page/sign_up_section.tsx';
import LogInImage from '@/pages/sign_up_page/sign_up_image_section.tsx';

export function SignUp() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) navigate("/home");
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
    </div>
  );

  if (user) return null;

  return (
    <div className="flex h-screen w-screen font-sans">
      <LogInImage/>
      <LogInPanel/>
    </div>
  );
}
