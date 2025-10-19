import MyFooter from "@/components/custom/common/footer";
import MyHeader from "@/components/custom/common/header";

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