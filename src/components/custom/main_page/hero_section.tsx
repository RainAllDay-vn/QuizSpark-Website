import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";


export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-screen w-screen overflow-hidden bg-black text-white">
  {/* === Gradient backdrop === */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#0d001a] via-black to-[#1a0000]" />

  {/* === Grid (visible!) === */}
  <div className="absolute inset-0 bg-[url('../../assets/img/Pattern.png')] bg-center bg-cover opacity-40 mix-blend-screen" />

  {/* === Left & Right soft glow === */}
  <div className="absolute left-0 top-0 w-[40vw] h-full bg-gradient-to-r from-[#6b21a8]/40 to-transparent blur-3xl" />
  <div className="absolute left-0 top-0 w-[40vw] h-full bg-gradient-to-r from-[#6b21a8]/40 to-transparent blur-3xl" />

  {/* === Content === */}
  <div className="relative z-10 max-w-3xl text-center space-y-8 px-6">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
      <Sparkles className="h-4 w-4 text-purple-400" />
      <span className="text-sm font-medium text-gray-300">
        The ultimate quiz experience
      </span>
    </div>

    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
      Learn, Quiz,{" "}
      <span className="bg-gradient-to-r from-[#7B3FE4] via-[#A134C7] to-[#E04646] text-transparent bg-clip-text">
        Earn Rewards
      </span>
    </h1>

    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
      Join thousands of students and teachers on the ultimate quiz platform.
      Test your knowledge, compete with peers, and win exciting rewards.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
      <Button
        size="lg"
        asChild
        className="text-lg font-semibold text-white bg-gradient-to-r from-[#7B3FE4] to-[#E04646] hover:opacity-90"
      >
        <Link to="/signup">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>

      <Button
        size="lg"
        variant="outline"
        asChild
        className="text-lg font-semibold border-white/20 text-white hover:bg-white/10"
      >
        <Link to="/explore">Explore Quizzes</Link>
      </Button>
    </div>

    <div className="flex items-center justify-center gap-3 pt-6">
      <div className="flex -space-x-2">
        <img src="/avatars/avatar1.png" className="w-8 h-8 rounded-full border-2 border-black" />
        <img src="/avatars/avatar2.png" className="w-8 h-8 rounded-full border-2 border-black" />
        <img src="/avatars/avatar3.png" className="w-8 h-8 rounded-full border-2 border-black" />
      </div>
      <p className="text-sm text-gray-400">
        <span className="text-[#7B3FE4] font-medium">5,000+</span> students joined this week
      </p>
    </div>
  </div>
</section>

  );
}