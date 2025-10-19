import { Button } from "@/components/ui/button";




export default function EndHeroSection() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 pt-20">
      {/* Floating header space is accounted for by pt-20 */}
      <div className="w-full max-w-6xl bg-gradient-to-r from-[#5b2fff] via-[#9b3aa9] to-[#c44b2d] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between shadow-lg">
        
        {/* Left Content */}
        <div className="text-white space-y-4 md:w-1/2">
          <h1 className="text-4xl font-bold leading-tight">
            Ready to Start Your Quiz Journey?
          </h1>
          <p className="text-gray-200 text-lg">
            Join thousands of students and teachers. Sign up today and get access to all features.
          </p>
          <div className="flex gap-4 pt-2">
            <Button className="bg-white text-black hover:bg-gray-100">
              Create Account
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Explore Quizzes
            </Button>
          </div>
        </div>

        {/* Right Placeholder */}
        <div className="bg-white rounded-2xl w-full md:w-[500px] h-[250px] mt-8 md:mt-0"></div>
      </div>
    </div>
  );
}
