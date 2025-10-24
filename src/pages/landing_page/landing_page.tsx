import HeroSection from "@/pages/landing_page/hero_section.tsx";
import CategoriesSection from "@/pages/landing_page/category_section.tsx";
import FeaturesSection from "@/pages/landing_page/feature_section.tsx";
import EndHeroSection from "@/pages/landing_page/end_hero_section.tsx";
import MyHeader from "@/components/custom/header.tsx";
import MyFooter from "@/components/custom/footer.tsx";

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col fill-black">
      <MyHeader/>
      <HeroSection/>
      <CategoriesSection/>
      <FeaturesSection/>
      <EndHeroSection/>
      <MyFooter/>
    </div>
  );
}