import HeroSection from "@/pages/main_page/hero_section.tsx";
import CategoriesSection from "@/pages/main_page/category_section.tsx";
import FeaturesSection from "@/pages/main_page/feature_section.tsx";
import EndHeroSection from "@/pages/main_page/end_hero_section.tsx";
import MyHeader from "@/components/custom/header.tsx";
import MyFooter from "@/components/custom/footer.tsx";

export function MainPage() {
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