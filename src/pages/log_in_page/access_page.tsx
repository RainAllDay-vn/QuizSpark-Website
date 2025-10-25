import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  getAuth,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';
import {app} from "../../firebase.tsx";
import LogoImageSection from '@/pages/log_in_page/logo_image_section.tsx';
import type LogInSection from "@/pages/log_in_page/log_in_section.tsx";
import type SignUpSection from "@/pages/log_in_page/sign_up_section.tsx";

interface AccessPageProps {
  Section: typeof LogInSection | typeof SignUpSection;
}

export function AccessPage({Section}: AccessPageProps) {
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
      <LogoImageSection/>
      <Section />
    </div>
  );
}
