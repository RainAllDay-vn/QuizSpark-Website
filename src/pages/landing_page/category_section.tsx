const categories = [
  {
    title: "Science & Tech",
    desc: "Test your knowledge in science & tech with our challenging quizzes",
    color: "border-blue-500 text-blue-400",
    hover: "hover:border-blue-400",
    linkColor: "text-blue-400 hover:text-blue-300",
    icon: "🔬",
  },
  {
    title: "Mathematics",
    desc: "Test your knowledge in mathematics with our challenging quizzes",
    color: "border-green-500 text-green-400",
    hover: "hover:border-green-400",
    linkColor: "text-green-400 hover:text-green-300",
    icon: "√",
  },
  {
    title: "Chemistry",
    desc: "Test your knowledge in chemistry with our challenging quizzes",
    color: "border-purple-500 text-purple-400",
    hover: "hover:border-purple-400",
    linkColor: "text-purple-400 hover:text-purple-300",
    icon: "⚛️",
  },
  {
    title: "Biology",
    desc: "Test your knowledge in biology with our challenging quizzes",
    color: "border-pink-500 text-pink-400",
    hover: "hover:border-pink-400",
    linkColor: "text-pink-400 hover:text-pink-300",
    icon: "🧬",
  },
  {
    title: "General Knowledge",
    desc: "Test your knowledge in general knowledge with our challenging quizzes",
    color: "border-yellow-500 text-yellow-400",
    hover: "hover:border-yellow-400",
    linkColor: "text-yellow-400 hover:text-yellow-300",
    icon: "🌍",
  },
  {
    title: "Current Affairs",
    desc: "Test your knowledge in current affairs with our challenging quizzes",
    color: "border-red-500 text-red-400",
    hover: "hover:border-red-400",
    linkColor: "text-red-400 hover:text-red-300",
    icon: "📰",
  },
]

export default function CategoriesSection() {
  return (
    
    <section className="relative mt-[0px] px-6 py-16 bg-[#0D0F1A] text-white overflow-hidden">
      {/* background pattern */}
      <div className="absolute inset-0 bg-[url('/src/assets/img/Pattern.png')] bg-center bg-cover opacity-20"></div>

      {/* side soft blurs */}
      <div className="absolute top-0 left-0 h-full w-[25%] bg-gradient-to-r from-[#0D0F1A] via-[#0D0F1A]/60 to-transparent blur-2xl"></div>
      <div className="absolute top-0 right-0 h-full w-[25%] bg-gradient-to-l from-[#0D0F1A] via-[#0D0F1A]/60 to-transparent blur-2xl"></div>

      {/* header */}
      <div className="relative z-10 text-center mb-12">
        <span className="px-3 py-1 rounded-full bg-white/10 text-sm">📚 Categories</span>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold">
          Explore{" "}
          <span className="bg-gradient-to-r from-[#7B3FE4] via-[#A134C7] to-[#E04646] bg-clip-text text-transparent">
            Quiz Categories
          </span>
        </h2>
        <p className="mt-2 text-gray-400 text-sm md:text-base">
          Pick your favorite topic and start learning through play.
        </p>
      </div>

      {/* cards */}
      <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, i) => (
          <div
            key={i}
            className={`bg-[#1A1A1D] border-t-4 ${cat.color} ${cat.hover} rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px]`}
          >
            <div>
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{cat.title}</h3>
              <p className="text-gray-400 text-sm">{cat.desc}</p>
            </div>
            <a
              href="#"
              className={`mt-4 inline-flex items-center gap-1 font-medium ${cat.linkColor} text-sm`}
            >
              Explore Quizzes →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
