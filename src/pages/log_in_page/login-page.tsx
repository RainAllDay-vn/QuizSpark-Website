"use client";

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    type User as FirebaseUser
} from 'firebase/auth';
import { app } from "../../firebase";
import LogInPanel from '@/pages/log_in_page/log_in_panel.tsx';
import LogInImage from '@/pages/log_in_page/log_in_image.tsx';



export function LoginPage() {
    const navigate = useNavigate();
    const auth = getAuth(app);

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setAccountType] = useState<"student" | "teacher">("student");
    const [error, setError] = useState("");
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

    const handleSubmit = async () => {
        setError("");
        if (!fullName || !username || !email || !password) {
            setError("All fields are required.");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            setError(err.message || "Registration failed.");
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (err: any) {
            setError(err.message || "Google sign-in failed.");
        }
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        </div>
    );

    if (user) return null;

    return (
        <div className="flex h-screen min-h-[700px] font-sans">
            <LogInImage />
            <LogInPanel
                fullName={fullName}
                setFullName={setFullName}
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                accountType={accountType}
                setAccountType={setAccountType}
                error={error}
                handleSubmit={handleSubmit}
                handleGoogleLogin={handleGoogleLogin}
                navigate={navigate}
            />
        </div>
    );
}
