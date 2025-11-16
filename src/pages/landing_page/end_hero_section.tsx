import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

export default function EndHeroSection() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 pt-20">
      {/* Dark flat card */}
      <div className="w-full max-w-6xl bg-gray-900 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between shadow-lg">
        
        {/* Left Content */}
        <div className="text-white space-y-4 md:w-1/2">
          <h1 className="text-4xl font-bold leading-tight">
            Ready to Start Your Quiz Journey?
          </h1>
          <p className="text-gray-300 text-lg">
            Join thousands of students and teachers. Sign up today and get access to all features.
          </p>
          <div className="flex gap-4 pt-2">
            <Button className="bg-purple-700 text-white hover:bg-purple-600">
              Create Account
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-gray-800"
            >
              <Link to="/banks">
              Explore Questions
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-[500px] h-[250px] mt-8 md:mt-0">
          <img
            src="https://www.eschoolnews.com/files/2021/03/online-research.jpg"
            alt="Quiz illustration"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
