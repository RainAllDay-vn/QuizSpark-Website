import {User, Mail, Lock, type LucideIcon} from 'lucide-react';
import {type ChangeEvent, useState} from "react";
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {app} from "../../firebase";
import {useNavigate} from "react-router-dom";
import {updateAuth} from "@/lib/api.ts";

interface AccountTypeButtonProps {
  type: string;
  currentType: string;
  icon: string;
  title: string;
  description: string;
  onClick: (type: string) => void;
}

interface InputWithIconProps {
  Icon: LucideIcon;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

function AccountTypeButton({type, currentType, icon, title, description, onClick}: AccountTypeButtonProps) {
  const isActive = currentType === type;
  const baseClass = "flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200"
  const activeClass = "bg-purple-50 border-purple-600 shadow-md text-purple-800"
  const inactiveClass = "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
  return (
    <div className={`${baseClass} ${isActive ? activeClass : inactiveClass}`} onClick={() => onClick(type)}>
      <div className="flex flex-col items-center text-center space-y-1">
        <div className={`text-3xl mb-1 ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
          {icon}
        </div>
        <p className="font-semibold text-base">{title}</p>
        <small className="text-xs text-gray-500">{description}</small>
      </div>
    </div>
  );
}

function InputWithIcon({Icon, label, type = "text", placeholder, value, onChange}: InputWithIconProps) {
  return (
    <div className={`space-y-1`}>
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
        <input
          className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-10 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-colors shadow-sm"
          type={type} placeholder={placeholder} value={value} onChange={onChange}
        />
      </div>
    </div>
  );
}

/*TO-DO:
* Remove login logic from this page
* Disable logging in with Teacher role
* */
export default function SignUpPage() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"student" | "teacher">("student");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!fullName || !username || !email || !password) {
      setError("All fields are required.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message || "Registration failed.");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      updateAuth(credential?.idToken);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message || "Registration failed.");
    }
  };

  return (
    <div className="flex-1 md:w-1/3 flex items-center justify-center bg-white p-4 md:p-12">
      <div className="w-full max-w-lg space-y-6">
        <header className="space-y-1">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 text-sm">Choose your account type and start your journey with us</p>
        </header>

        <div className="flex gap-4">
          <AccountTypeButton
            type="student"
            currentType={accountType}
            icon="🎓"
            title="Student"
            description="Take quizzes and track your progress"
            onClick={() => setAccountType("student")}
          />
          <AccountTypeButton
            type="teacher"
            currentType={accountType}
            icon="🧑‍🏫"
            title="Teacher"
            description="Create quizzes and manage students"
            onClick={() => setAccountType("teacher")}
          />
        </div>

        <div className="flex gap-4 pt-2">
          <button
            className="flex-1 flex items-center justify-center h-10 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/330px-Google_Favicon_2025.svg.png"
              alt="Google logo" className="w-4 h-4 mr-2"/>
            Google
          </button>
          <button
            className="flex-1 flex items-center justify-center h-10 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
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
          <div className="flex gap-4">
            <InputWithIcon
              label="Full Name"
              Icon={User}
              placeholder="John Doe"
              value={fullName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
            />
            <InputWithIcon
              label="Username"
              Icon={User}
              placeholder="johndoe123"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
          </div>

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