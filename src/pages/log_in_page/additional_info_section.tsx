import {User, Calendar, BookOpen, LogOut} from 'lucide-react';
import {type ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import InputWithIcon from "@/components/custom/input_with_icon.tsx";
import {getAuth, signOut} from "firebase/auth";
import {app} from "../../firebase.tsx";
import AccountTypeButton from "@/components/custom/account_type_button.tsx";
import type UserRegistrationDAO from "@/model/UserRegistrationDAO.ts";
import {registerNewUser} from "@/lib/api.ts";
import {AxiosError} from 'axios';

export default function AdditionalInfoSection() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [accountType, setAccountType] = useState<"STUDENT" | "TEACHER">("STUDENT");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!username || !accountType || !firstName || !lastName) {
      setError("Please filled the required fields.");
      return;
    }
    
    const payload: UserRegistrationDAO = {
      accountType,
      username,
      firstName,
      lastName,
      dob: dob || undefined,
      educationLevel: educationLevel || undefined
    };
    
    try {
      await registerNewUser(payload);
      navigate("/home");
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data) {
        let errorMessage = ''
        Object.values(err.response.data).forEach(value => errorMessage += value+'. ');
        setError(errorMessage);
      } else if (err instanceof Error) {
        setError(err.message || "Registration failed. Please try again.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message || "Sign out failed.");
    }
  };

  return (
    <div className="flex-1 md:w-1/3 flex items-center justify-center bg-white p-4 md:p-12">
      <div className="w-full max-w-lg space-y-6">
        <header className="space-y-1">
          <h2 className="text-3xl font-bold text-gray-900">Additional Information</h2>
          <p className="text-gray-500 text-sm">Help us personalize your experience <span className="text-red-500">*</span> Required fields</p>
        </header>

        <div className="space-y-4">
          <div className="text-sm font-semibold text-gray-700 mb-2">Account Type <span className="text-red-500">*</span></div>
          <div className="flex gap-4">
            <AccountTypeButton
              type="STUDENT"
              currentType={accountType}
              icon="🎓"
              title="Student"
              description="Take quizzes and track your progress"
              onClick={() => setAccountType("STUDENT")}
            />
            <AccountTypeButton
              type="TEACHER"
              currentType={accountType}
              icon="🧑‍🏫"
              title="Teacher"
              description="Create quizzes and manage students"
              onClick={() => alert("Teacher account type not implemented yet")}
            />
          </div>

          <InputWithIcon
            label={<>Username <span className="text-red-500">*</span></>}
            Icon={User}
            type="text"
            placeholder="johndoe"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputWithIcon
              label={<>First Name <span className="text-red-500">*</span></>}
              Icon={User}
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            />
            <InputWithIcon
              label={<>Last Name <span className="text-red-500">*</span></>}
              Icon={User}
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            />
          </div>

          <InputWithIcon
            label="Date of Birth"
            Icon={Calendar}
            type="date"
            placeholder="Select date"
            value={dob}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDob(e.target.value)}
          />

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Education Level (Optional)</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
              <select
                className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-10 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-colors shadow-sm appearance-none"
                value={educationLevel}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setEducationLevel(e.target.value)}
              >
                <option value="" disabled>Select education level</option>
                <option value="high_school">High School</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">PhD</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium pt-2">{error}</p>}

          <div className="flex gap-4 pt-2">
            <button
              className="flex-1 h-10 px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300 flex items-center justify-center"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2"/>
              Sign Out
            </button>
            <button
              className="flex-1 h-10 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>

        <div className="text-center text-sm pt-2">
          <p className="text-gray-500">
            Your information helps us customize your experience
          </p>
        </div>
      </div>
    </div>
  );
}
