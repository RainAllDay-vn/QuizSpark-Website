import {Mail, Lock} from 'lucide-react';
import {type ChangeEvent, useState} from "react";
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {app} from "../../firebase.tsx";
import {useNavigate} from "react-router-dom";
import InputWithIcon from "@/components/custom/input_with_icon.tsx";

export default function SignUpSection() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleRegister = async () => {
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message || "Registration failed.");
    }
  };

  const handleFacebookLogin = () => {
    alert("Facebook login feature is not ready yet.");
  };

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message || "Registration failed.");
    }
  };

  return (
    <div className="flex-1 md:w-1/3 flex items-center justify-center bg-white p-4 md:p-12">
      <div className="w-full max-w-lg space-y-6">
        <header className="space-y-1">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 text-sm">Start your journey with us</p>
        </header>

        <div className="flex gap-4 pt-2">
          <button
            className="flex-1 flex items-center justify-center h-10 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            onClick={handleGoogleRegister}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/330px-Google_Favicon_2025.svg.png"
              alt="Google logo" className="w-4 h-4 mr-2"/>
            Google
          </button>
          <button
            className="flex-1 flex items-center justify-center h-10 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            onClick={handleFacebookLogin}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                 alt="Facebook logo" className="w-4 h-4 mr-2"/>
            Facebook
          </button>
        </div>

        <div className="flex items-center space-x-2 py-1">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="text-xs text-gray-400 font-medium">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="space-y-4">
          <InputWithIcon
            label="Email"
            Icon={Mail}
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <InputWithIcon
            label="Password"
            Icon={Lock}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm font-medium pt-2">{error}</p>}

          <button
            className="w-full h-10 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>

        <div className="text-center text-sm pt-2">
          Already have an account?
          <button className="text-purple-600 font-semibold hover:underline ml-1" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}