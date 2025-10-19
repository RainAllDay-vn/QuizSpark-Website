import { User, Mail, Lock } from 'lucide-react';



const InputWithIcon = ({ Icon, label, className = "", ...props }: any) => (
    <div className={`space-y-1 ${className}`}>
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <div className="relative">
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
                className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-10 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-colors shadow-sm"
                {...props}
            />
        </div>
    </div>
);

const AccountTypeButton = ({ type, currentType, icon, title, description, onClick }: any) => {
    const isActive = currentType === type;
    return (
        <div
            className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                isActive
                    ? "bg-purple-50 border-purple-600 shadow-md text-purple-800"
                    : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
            }`}
            onClick={() => onClick(type)}
        >
            <div className="flex flex-col items-center text-center space-y-1">
                <div className={`text-3xl mb-1 ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
                    {icon}
                </div>
                <p className="font-semibold text-base">{title}</p>
                <small className="text-xs text-gray-500">{description}</small>
            </div>
        </div>
    );
};


export default function LogInPanel({
    fullName,
    setFullName,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    accountType,
    setAccountType,
    error,
    handleSubmit,
    handleGoogleLogin,
    navigate,
}: any) {
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
                        onClick={setAccountType}
                    />
                    <AccountTypeButton
                        type="teacher"
                        currentType={accountType}
                        icon="🧑‍🏫"
                        title="Teacher"
                        description="Create quizzes and manage students"
                        onClick={setAccountType}
                    />
                </div>

                <div className="flex gap-4 pt-2">
                    <button
                        className="flex-1 flex items-center justify-center h-10 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                        onClick={handleGoogleLogin}
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/330px-Google_Favicon_2025.svg.png" alt="Google logo" className="w-4 h-4 mr-2" />
                        Google
                    </button>
                    <button
                        className="flex-1 flex items-center justify-center h-10 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook logo" className="w-4 h-4 mr-2" />
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
                            onChange={(e: any) => setFullName(e.target.value)}
                            className="flex-1"
                        />
                        <InputWithIcon
                            label="Username"
                            Icon={User}
                            placeholder="johndoe123"
                            value={username}
                            onChange={(e: any) => setUsername(e.target.value)}
                            className="flex-1"
                        />
                    </div>

                    <InputWithIcon
                        label="Email"
                        Icon={Mail}
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                    />
                    <InputWithIcon
                        label="Password"
                        Icon={Lock}
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
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