import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-screen w-screen overflow-hidden bg-black text-white">
      
      {/* === Grid overlay === */}
      <div className="absolute inset-0 bg-[url('../../assets/img/Pattern.png')] bg-center bg-cover opacity-20 mix-blend-screen" />

      {/* === Left & Right soft glow (flat purple) === */}
      <div className="absolute left-0 top-0 w-[40vw] h-full bg-purple-800/30 blur-3xl" />
      <div className="absolute right-0 top-0 w-[40vw] h-full bg-purple-800/30 blur-3xl" />

      {/* === Content === */}
      <div className="relative z-10 max-w-3xl text-center space-y-8 px-6">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 border border-gray-700">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-medium text-gray-300">
            The ultimate quiz experience
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Learn, Practice,{" "}
          <span className="text-purple-500">
            Earn Rewards
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Join thousands of students and teachers on the ultimate Quizzing platform.
          Test your knowledge, compete with peers, and win exciting rewards.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            size="lg"
            asChild
            className="text-lg font-semibold text-white bg-purple-700 hover:bg-purple-600"
          >
            <Link to="/signup">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="text-lg font-semibold border-white/20 text-white hover:bg-gray-800"
          >
            <Link to="/banks">Explore Questions</Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
