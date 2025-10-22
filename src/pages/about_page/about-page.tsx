import MyFooter from "@/components/custom/footer.tsx";
import MyHeader from "@/components/custom/header.tsx";

export  function AboutSection() {
  return (
    <section className="relative flex items-center justify-center min-h-screen w-screen overflow-hidden bg-black text-white">
        About Page
    </section>

  );
}

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col fill-black">
      <MyHeader/>
      <AboutSection/>

      <MyFooter/>
    </div>
  );
}