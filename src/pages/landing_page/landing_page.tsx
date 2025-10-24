import MyHeader from "@/components/custom/header.tsx";
import MyFooter from "@/components/custom/footer.tsx";

export function LandingPage () {
  return (
    <div className="min-h-screen flex flex-col fill-black">
      <MyHeader/>
      <section
        className="relative flex items-center justify-center min-h-screen w-screen overflow-hidden bg-black text-white">
        Home
      </section>
      <MyFooter/>
    </div>
  );
}