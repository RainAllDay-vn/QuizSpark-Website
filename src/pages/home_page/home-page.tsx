import MyHeader from "@/components/custom/common/header";
import MyFooter from "@/components/custom/common/footer";



export default function HomeSection() {
  return (
    <section className="relative flex items-center justify-center min-h-screen w-screen overflow-hidden bg-black text-white">
        Home
    </section>

  );
}

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col fill-black">
      <MyHeader/>
      <HomeSection/>

      <MyFooter/>
    </div>
  );
}