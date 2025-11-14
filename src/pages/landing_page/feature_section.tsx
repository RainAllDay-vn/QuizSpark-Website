export default function FeaturesSection() {
  const features = [
    {
      title: "Personalized Learning",
      desc: "Adaptive questions that adjust to your knowledge level and learning pace",
      color: "text-purple-400 border-t-4 border-purple-500",
      icon: "🧠",
    },
    {
      title: "Reward System",
      desc: "Earn points, badges, and real rewards for your achievements",
      color: "text-red-400 border-t-4 border-red-500",
      icon: "🎁",
    },
    {
      title: "Teacher Dashboard_section",
      desc: "Comprehensive tools for educators to create and manage questions",
      color: "text-blue-400 border-t-4 border-blue-500",
      icon: "👩‍🏫",
    },
    {
      title: "Progress Tracking",
      desc: "Adaptive questions that adjust to your knowledge level and learning pace",
      color: "text-green-400 border-t-4 border-green-500",
      icon: "📈",
    },
    {
      title: "Competitive Leaderboards",
      desc: "Compete with peers and climb the ranks in various categories",
      color: "text-yellow-400 border-t-4 border-yellow-500",
      icon: "🏆",
    },
    {
      title: "Mobile Friendly",
      desc: "Access questions anytime, anywhere on any device",
      color: "text-purple-400 border-t-4 border-purple-500",
      icon: "📱",
    },
  ];

  return (
    <section className="relative mt-[0px] px-6 py-16 bg-[#0D0F1A] text-white overflow-hidden">
      {/* background pattern */}
      <div className="absolute inset-0 bg-[url('/src/assets/img/Pattern.png')] bg-center bg-cover opacity-20"></div>

      {/* side soft blurs */}
      <div className="absolute top-0 left-0 h-full w-[25%] bg-gradient-to-r from-[#0D0F1A] via-[#0D0F1A]/60 to-transparent blur-2xl"></div>
      <div className="absolute top-0 right-0 h-full w-[25%] bg-gradient-to-l from-[#0D0F1A] via-[#0D0F1A]/60 to-transparent blur-2xl"></div>

      {/* header */}
      <div className="relative z-10 text-center mb-12">
        <span className="px-3 py-1 rounded-full bg-white/10 text-sm">⭐ Features</span>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold">
          Why{" "}
          <span className="bg-gradient-to-r from-[#7B3FE4] via-[#A134C7] to-[#E04646] bg-clip-text text-transparent">
            QuizSpark
          </span>
        </h2>
        <p className="mt-2 text-gray-400 text-sm md:text-base">
          Discover questions across various subjects to test and expand your knowledge
        </p>
      </div>

      {/* feature cards */}
      <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className={`bg-[#1A1A1D] ${f.color} rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px]`}
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

